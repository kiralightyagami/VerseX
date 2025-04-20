import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="font-pixel text-primary-yellow text-2xl mb-8">Loading verseX</h1>
      
      <div className="w-64 h-8 bg-gray-800 border-2 border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full bg-primary-yellow animate-pulse"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-70 flex items-center justify-center">
          <div className="font-pixel-body text-white text-sm">Generating world...</div>
        </div>
      </div>
      
      <p className="font-pixel-body text-gray-400 mt-8 text-center max-w-md">
        Tip: Use WASD or arrow keys to move around the world. Press E to interact with objects.
      </p>
    </div>
  );
};

export default Loading;