"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SpaceCard from '@/components/SpaceCard';

// Mock data for spaces
const mockSpaces = [
  {
    id: 'space-1',
    name: 'Pixel Cafe',
    description: 'A cozy cafe for virtual meetings',
    thumbnail: '/spaces/cafe.png',
    participants: 12,
    capacity: 20,
  },
  {
    id: 'space-2',
    name: 'Magic Academy',
    description: 'Learn spells with other wizards',
    thumbnail: '/spaces/academy.png',
    participants: 8,
    capacity: 15,
  },
  {
    id: 'space-3',
    name: 'Tech Lab',
    description: 'Collaborate on innovative projects',
    thumbnail: '/spaces/techlab.png',
    participants: 5,
    capacity: 10,
  },
  {
    id: 'space-4',
    name: 'Gaming Arena',
    description: 'Challenge others to pixel games',
    thumbnail: '/spaces/arena.png',
    participants: 18,
    capacity: 25,
  },
];

export default function JoinSpace() {
  const router = useRouter();
  const [spaceCode, setSpaceCode] = useState('');
  const [error, setError] = useState('');

  const handleJoinSpace = () => {
    if (!spaceCode.trim()) {
      setError('Please enter a space code');
      return;
    }

    // Mock validation - in a real app this would check with the backend
    if (spaceCode === '123456' || spaceCode.toLowerCase() === 'demo') {
      router.push('/game');
    } else {
      setError('Invalid space code');
    }
  };

  const handleSpaceSelect = (spaceId: string) => {
    // In a real app, this would load the selected space
    console.log(`Selected space: ${spaceId}`);
    router.push('/game');
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-primary-yellow py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-pixel text-2xl sm:text-3xl mb-6 text-center">Join a Space</h1>
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
            <div className="mb-6">
              <Label htmlFor="space-code" className="font-pixel text-sm block mb-2">
                Enter Space Code
              </Label>
              <Input
                id="space-code"
                type="text"
                placeholder="e.g., 123456"
                value={spaceCode}
                onChange={(e) => {
                  setSpaceCode(e.target.value);
                  if (error) setError('');
                }}
                className="font-pixel-body border-2 border-black"
              />
              {error && <p className="text-red-500 font-pixel-body mt-2">{error}</p>}
            </div>
            <Button
              onClick={handleJoinSpace}
              className="w-full bg-black text-white hover:bg-gray-800 font-pixel"
            >
              Join Now
            </Button>
            <p className="text-center font-pixel-body text-gray-600 mt-4">
              Hint: Use "123456" or "demo" as test codes
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <h2 className="font-pixel text-2xl mb-8 text-center">Featured Spaces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockSpaces.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onSelect={() => handleSpaceSelect(space.id)}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-pixel text-2xl mb-6">Create Your Own Space</h2>
          <p className="font-pixel-body text-gray-700 mb-6 max-w-2xl mx-auto">
            Want to design your own custom space? Create a unique environment for your friends or team.
          </p>
          <Button
            onClick={() => router.push('/create')}
            className="bg-black text-white hover:bg-gray-800 font-pixel"
          >
            Create Space
          </Button>
        </div>
      </div>
    </main>
  );
}