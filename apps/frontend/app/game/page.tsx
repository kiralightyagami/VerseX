"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PhaserGame from '@/components/game/PhaserGame';
import GameChat from '@/components/game/GameChat';
import GameControls from '@/components/game/GameControls';
import GameMenu from '@/components/game/GameMenu';
import Loading from '@/components/game/Loading';

// Define the type for game data
type GameData = {
  worldId: string;
  name: string;
  map: string;
  spawnPoint: { x: number; y: number };
};

export default function GamePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  
  const worldId = searchParams.get('world') || 'default';
  
  useEffect(() => {
    // Simulate loading game data
    const loadGameData = async () => {
      // In a real app, this would fetch data from the backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGameData({
        worldId,
        name: worldId === 'default' ? 'Default World' : `World ${worldId}`,
        map: '/maps/default-map.json',
        spawnPoint: { x: 100, y: 100 },
      });
      
      setIsLoading(false);
    };
    
    loadGameData();
  }, [worldId]);
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <main className="h-screen w-screen flex flex-col bg-gray-900 overflow-hidden">
      <div className="flex-grow relative flex">
        {/* Game canvas */}
        <div className="flex-grow relative">
          <PhaserGame worldData={gameData} />
          
          {/* Game controls overlay (mobile only) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
            <GameControls />
          </div>
        </div>
        
        {/* Chat sidebar */}
        <div 
          className={`absolute md:relative right-0 h-full w-full md:w-80 bg-white transform transition-transform duration-300 ease-in-out ${
            isChatOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
          }`}
        >
          <GameChat onClose={() => setIsChatOpen(false)} />
        </div>
      </div>
      
      {/* Game UI */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={toggleMenu}
          className="bg-black text-white p-2 font-pixel text-sm"
        >
          Menu
        </button>
        <button
          onClick={toggleChat}
          className="bg-primary-yellow text-black p-2 font-pixel text-sm md:hidden"
        >
          Chat
        </button>
      </div>
      
      {/* Game menu modal */}
      {isMenuOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <GameMenu onClose={toggleMenu} />
        </div>
      )}
    </main>
  );
}