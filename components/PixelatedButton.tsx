
import React from 'react';

interface PixelatedButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const PixelatedButton: React.FC<PixelatedButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-4 bg-pink-500 text-white text-2xl border-2 border-white
        font-bold tracking-wider relative transition-all duration-200
        hover:bg-pink-600 hover:-translate-x-1 hover:-translate-y-1
        active:bg-pink-700 active:translate-x-0 active:translate-y-0
        disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed
        disabled:shadow-none disabled:transform-none
        shadow-[6px_6px_0px_rgba(6,182,212,1)] disabled:shadow-[6px_6px_0px_rgba(107,114,128,1)]
      `}
    >
      {children}
    </button>
  );
};

export default PixelatedButton;
