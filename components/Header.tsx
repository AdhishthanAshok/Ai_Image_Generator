"use client";

import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white py-4 border-b border-gray-300 dark:border-gray-600 transition-colors duration-300">
      <div className="container mx-auto flex flex-col justify-center items-center gap-5">
        <div className="flex flex-row justify-evenly items-center gap-10 w-full max-w-4xl">
          <Link href="/" className="text-2xl font-bold">
            AI Image Generator
          </Link>
          <ThemeSwitch />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block lg:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
        <div className="w-full sm:flex sm:flex-col sm:justify-start sm:items-center">
          {/* Navigation Links */}
          <nav
            className={`lg:flex lg:items-center lg:space-x-4 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-4 ">
              <Link
                href="/explore"
                className="block lg:inline px-4 py-2 hover:bg-blue-700 rounded dark:hover:bg-blue-800"
              >
                Explore
              </Link>
              <Link
                href="/generation"
                className="block lg:inline px-4 py-2 hover:bg-blue-700 rounded dark:hover:bg-blue-800"
              >
                Generate
              </Link>
              <Link
                href="/profile"
                className="block lg:inline px-4 py-2 hover:bg-blue-700 rounded dark:hover:bg-blue-800"
              >
                Profile
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
