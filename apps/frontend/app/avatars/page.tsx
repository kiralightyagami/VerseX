"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AvatarCard from '@/components/AvatarCard';

// Mock data for avatars
const harryPotterAvatars = [
  { id: 'hp-1', name: 'Harry Potter', image: '/avatars/harry-1.png', locked: false },
  { id: 'hp-2', name: 'Hermione', image: '/avatars/harry-2.png', locked: false },
  { id: 'hp-3', name: 'Ron Weasley', image: '/avatars/harry-3.png', locked: false },
  { id: 'hp-4', name: 'Dumbledore', image: '/avatars/harry-4.png', locked: true },
];

const ironManAvatars = [
  { id: 'im-1', name: 'Mark III', image: '/avatars/ironman-1.png', locked: false },
  { id: 'im-2', name: 'Mark VII', image: '/avatars/ironman-2.png', locked: false },
  { id: 'im-3', name: 'War Machine', image: '/avatars/ironman-3.png', locked: false },
  { id: 'im-4', name: 'Hulkbuster', image: '/avatars/ironman-4.png', locked: true },
];

export default function AvatarsPage() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  
  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
  };
  
  const handleConfirmSelection = () => {
    if (selectedAvatar) {
      // In a real app, this would save the avatar selection to the user profile
      console.log(`Selected avatar: ${selectedAvatar}`);
      router.push('/join');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-primary-yellow py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-pixel text-2xl sm:text-3xl mb-6 text-center">Choose Your Avatar</h1>
          
          {/* Preview of selected avatar */}
          <div className="max-w-xs mx-auto mb-8">
            {selectedAvatar ? (
              <div className="bg-white p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] text-center">
                <h3 className="font-pixel text-lg mb-4">Your Selection</h3>
                <div className="h-40 w-full relative mb-4">
                  <Image
                    src={
                      [...harryPotterAvatars, ...ironManAvatars].find(
                        (avatar) => avatar.id === selectedAvatar
                      )?.image || '/avatars/default.png'
                    }
                    alt="Selected Avatar"
                    fill
                    className="object-contain"
                  />
                </div>
                <Button
                  onClick={handleConfirmSelection}
                  className="w-full bg-black text-white hover:bg-gray-800 font-pixel"
                >
                  Confirm Selection
                </Button>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] text-center">
                <h3 className="font-pixel text-lg mb-2">No Avatar Selected</h3>
                <p className="font-pixel-body text-gray-600">Choose your character below</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <Tabs defaultValue="harry" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="harry" className="font-pixel">Harry Potter</TabsTrigger>
            <TabsTrigger value="ironman" className="font-pixel">Iron Man</TabsTrigger>
          </TabsList>
          
          <TabsContent value="harry">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {harryPotterAvatars.map((avatar) => (
                <AvatarCard
                  key={avatar.id}
                  avatar={avatar}
                  isSelected={selectedAvatar === avatar.id}
                  onSelect={handleAvatarSelect}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ironman">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {ironManAvatars.map((avatar) => (
                <AvatarCard
                  key={avatar.id}
                  avatar={avatar}
                  isSelected={selectedAvatar === avatar.id}
                  onSelect={handleAvatarSelect}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}