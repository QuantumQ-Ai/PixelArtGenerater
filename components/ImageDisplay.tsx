
import React from 'react';
import Loader from './Loader';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
  const containerClasses = "w-full max-w-lg h-96 sm:h-[512px] flex items-center justify-center p-4 bg-gray-800 border-4 border-purple-500 shadow-[8px_8px_0px_rgba(168,85,247,0.5)]";

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerClasses}>
        <div className="text-center">
          <p className="text-4xl text-red-500">Error!</p>
          <p className="text-xl text-red-300 mt-2">{error}</p>
        </div>
      </div>
    );
  }
  
  if (imageUrl) {
    return (
      <div className={containerClasses}>
        <img
          src={imageUrl}
          alt="Generated pixel art"
          className="w-full h-full object-contain image-rendering-pixelated"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <p className="text-3xl text-white">Your creation will appear here</p>
        <p className="text-xl text-gray-400 mt-2">Enter a prompt and click generate!</p>
      </div>
    </div>
  );
};

export default ImageDisplay;
