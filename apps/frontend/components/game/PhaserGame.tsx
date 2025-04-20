"use client";

import React, { useEffect, useRef } from 'react';


if (typeof window !== 'undefined') {
  (window as any).__PHASER_SPECTOR_JS_INSTALLED = false;
}

import Phaser from 'phaser';
import { MainScene } from '@/lib/game/scenes/MainScene';
import { PreloadScene } from '@/lib/game/scenes/PreloadScene';

interface PhaserGameProps {
  worldData: any;
}

const PhaserGame: React.FC<PhaserGameProps> = ({ worldData }) => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameContainerRef.current) return;

    // Define game configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameContainerRef.current,
      backgroundColor: '#000000',
      pixelArt: true,
      scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: [PreloadScene, MainScene],
    };

    // Create new game instance
    gameRef.current = new Phaser.Game(config);

    // Pass world data to game
    const dataToPass = {
      worldId: worldData.worldId,
      map: worldData.map,
      spawnPoint: worldData.spawnPoint,
    };

    // Add worldData to game registry
    gameRef.current.registry.set('worldData', dataToPass);

    // Clean up function
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [worldData]);

  return (
    <div 
      ref={gameContainerRef} 
      className="w-full h-full game-container"
      id="phaser-game"
    />
  );
};

export default PhaserGame;