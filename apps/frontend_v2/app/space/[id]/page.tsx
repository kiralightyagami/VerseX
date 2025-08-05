'use client'
import GameCanvas from "../../components/game/GameCanvas";

export default function SpacePage() {
  return (
    <div className="flex flex-col items-center relative overflow-y-auto h-screen">
      <GameCanvas />
    </div>
  );
}