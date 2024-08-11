"use client";

import React, { useState, useEffect } from "react";

const RATE_LIMIT_CLICKS = 3; // Maximum number of allowed clicks
const RATE_LIMIT_INTERVAL = 1 * 60 * 1000; // 1 minute in milliseconds for testing

interface RateLimitedButtonProps {
  onClick: () => Promise<void>; // Ensure onClick returns a Promise
}

const RateLimitedButton: React.FC<RateLimitedButtonProps> = ({ onClick }) => {
  const [clicksRemaining, setClicksRemaining] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const now = Date.now();
    const storedData = localStorage.getItem("rateLimitData");

    if (storedData) {
      const { lastReset, clickCount } = JSON.parse(storedData);
      const timePassed = now - lastReset;

      if (timePassed < RATE_LIMIT_INTERVAL) {
        setClicksRemaining(Math.max(0, RATE_LIMIT_CLICKS - clickCount));
        setTimeRemaining(RATE_LIMIT_INTERVAL - timePassed);
        setIsDisabled(true);
      } else {
        // Rate limit interval has passed; reset the state
        localStorage.removeItem("rateLimitData");
        setClicksRemaining(RATE_LIMIT_CLICKS);
        setTimeRemaining(null);
        setIsDisabled(false);
      }
    } else {
      setClicksRemaining(RATE_LIMIT_CLICKS);
    }
  }, []);

  const handleClick = async () => {
    const now = Date.now();
    const storedData = localStorage.getItem("rateLimitData");

    if (storedData) {
      const { lastReset, clickCount } = JSON.parse(storedData);
      const timePassed = now - lastReset;

      if (timePassed < RATE_LIMIT_INTERVAL) {
        if (clickCount >= RATE_LIMIT_CLICKS) {
          setIsDisabled(true);
          setTimeRemaining(RATE_LIMIT_INTERVAL - timePassed);
          return;
        }
        localStorage.setItem(
          "rateLimitData",
          JSON.stringify({ lastReset, clickCount: clickCount + 1 })
        );
      } else {
        localStorage.setItem(
          "rateLimitData",
          JSON.stringify({ lastReset: now, clickCount: 1 })
        );
        setClicksRemaining(RATE_LIMIT_CLICKS - 1);
        setTimeRemaining(null);
        setIsDisabled(false);
      }
    } else {
      localStorage.setItem(
        "rateLimitData",
        JSON.stringify({ lastReset: now, clickCount: 1 })
      );
      setClicksRemaining(RATE_LIMIT_CLICKS - 1);
      setTimeRemaining(null);
      setIsDisabled(false);
    }

    try {
      if (typeof onClick === "function") {
        await onClick(); // Ensure onClick is a Promise
      } else {
        console.error("onClick prop is not a function");
      }
    } catch (error) {
      console.error("Error during button click:", error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timeRemaining !== null && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev && prev > 1000) {
            return prev - 1000;
          } else {
            clearInterval(timer!);
            return 0;
          }
        });
      }, 1000);
    } else {
      // Clear timer and reset states when countdown ends
      if (timer) {
        clearInterval(timer);
      }
      setIsDisabled(false);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeRemaining]);

  return (
    <div className="flex flex-col items-center gap-5">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Generate
      </button>
      <div className="flex flex-col items-center">
        <div>Free Generation Limit Excedded</div>
        <div>Try after 1 hour </div>
      </div>
    </div>
  );
};

export default RateLimitedButton;
