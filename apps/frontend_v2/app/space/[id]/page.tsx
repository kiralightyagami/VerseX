'use client'
import dynamic from 'next/dynamic';

const GameCanvas = dynamic(() => import("../../components/game/GameCanvas"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading game...</div>
});

export default function SpacePage() {
  return (
    <div className="flex flex-col items-center relative overflow-y-auto h-screen">
      <GameCanvas />
    </div>
  );
}