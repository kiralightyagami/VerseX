"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { updateUserMetadata, User } from '@/lib/auth';

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/signin');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleAvatarUpdate = async () => {
    if (!user?.token || !selectedAvatar) return;

    try {
      await updateUserMetadata(user.token, selectedAvatar);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      
      // Update local storage with new avatar
      const updatedUser = { ...user, avatarId: selectedAvatar };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-pixel text-3xl text-center mb-8 text-black dark:text-white">
            Your Profile
          </h1>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
            <div className="space-y-6">
              <div>
                <Label>Username</Label>
                <Input value={user.username} disabled />
              </div>

              <div>
                <Label>Account Type</Label>
                <Input value={user.type} disabled />
              </div>

              <div>
                <Label>Current Avatar</Label>
                <div className="mt-2 p-4 border-2 border-dashed rounded-lg">
                  {user.avatarId ? (
                    <Image
                      src={`/avatars/${user.avatarId}.png`}
                      alt="Current Avatar"
                      width={100}
                      height={100}
                      className="mx-auto"
                    />
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      No avatar selected
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>Select New Avatar</Label>
                <div className="grid grid-cols-4 gap-4 mt-2">
                  {['harry-1', 'harry-2', 'ironman-1', 'ironman-2'].map((avatarId) => (
                    <div
                      key={avatarId}
                      className={`cursor-pointer p-2 rounded-lg border-2 ${
                        selectedAvatar === avatarId
                          ? 'border-primary-yellow'
                          : 'border-transparent'
                      }`}
                      onClick={() => setSelectedAvatar(avatarId)}
                    >
                      <Image
                        src={`/avatars/${avatarId}.png`}
                        alt={avatarId}
                        width={80}
                        height={80}
                        className="mx-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAvatarUpdate}
                className="w-full"
                disabled={!selectedAvatar}
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}