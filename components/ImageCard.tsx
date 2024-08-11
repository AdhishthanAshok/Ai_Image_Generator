// components/ImageCard.tsx
import React from "react";

interface ImageCardProps {
  src: string;
  title: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src="/images/Badge.png"
        alt={title}
        className="w-full h-32 object-cover rounded-lg mb-2"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
};

export default ImageCard;
