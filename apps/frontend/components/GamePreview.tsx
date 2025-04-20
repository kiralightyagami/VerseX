"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const GamePreview: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="rounded-lg overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
      <div ref={canvasRef} className="relative aspect-video w-full bg-gray-900">
        <Image
          src="/previews/game-preview.png"
          alt="Game Preview"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center">
            <h3 className="font-pixel text-white text-lg mb-4">Interactive Preview</h3>
            <button className="bg-primary-yellow px-6 py-3 font-pixel text-black hover:bg-yellow-400 transition-colors">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePreview;