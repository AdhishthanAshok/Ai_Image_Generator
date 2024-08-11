"use client";

import { useAuth } from "../../context/AuthContext";
import { images } from "../../public/data";
import RateLimitedButton from "@/components/RateLimitedButton";
import React, { useState } from "react";

const Generation: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!user) {
      setError("Unauthorized. Please log in.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Generate a random image
      const randomImage = images[Math.floor(Math.random() * images.length)];
      setGeneratedImage(randomImage.src);
    } catch (err) {
      console.error("Error generating image:", err);
      setError("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Generate Image</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here"
        className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
      />
      <RateLimitedButton onClick={handleGenerate} />
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {generatedImage && (
        <div className="mt-6 w-[200px] h-[300px]">
          <img
            src={generatedImage}
            alt="Generated"
            className="w-full max-w-md object-cover rounded-lg mb-2"
          />
        </div>
      )}
    </div>
  );
};

export default Generation;
