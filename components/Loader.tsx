
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <div className="w-6 h-6 bg-cyan-400 animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-6 h-6 bg-pink-500 animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-6 h-6 bg-purple-500 animate-pulse"></div>
      </div>
      <p className="text-2xl text-white">Creating masterpiece...</p>
    </div>
  );
};

export default Loader;
