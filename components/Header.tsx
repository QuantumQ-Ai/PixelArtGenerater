
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-widest relative inline-block">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Pixel Art Generator
        </span>
        <span
          className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-400"
          aria-hidden="true"
        />
      </h1>
      <p className="text-xl text-cyan-300 mt-4">
        Turn your ideas into retro-style art with AI
      </p>
    </header>
  );
};

export default Header;
