"use client";

import { images as initialImages } from "../../public/data";
import { auth } from "../../utils/firestore";
import React, { useState } from "react";

// You should load the images from Firestore and manage `likedImages` there for a production app
const Explore = () => {
  const [images, setImages] = useState(initialImages);

  const handleLike = async (image: any) => {
    if (auth.currentUser) {
      // Update the Firestore to reflect the liked image

      // Update the local state
      setImages(
        images.map((img) =>
          img.src === image.src ? { ...img, added: 1 } : img
        )
      );
    }
  };

  return (
    <div className="container min-w-full text-center mx-auto py-8 px-4 sm:px-6 md:py-12 md:px-8 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <h1 className="text-2xl font-semibold mb-6">Explore Our Images</h1>
      <div className="grid grid-cols-2 justify-items-center gap-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-square w-44 rounded-md object-cover transition-transform duration-300 group-hover:scale-105 dark:opacity-90"
            />
            {image.added === 0 && (
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                onClick={() => handleLike(image)}
              >
                ❤️
              </button>
            )}
            {image.added === 1 && (
              <button className="absolute top-2 right-2 text-red-600">
                ❤️
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
