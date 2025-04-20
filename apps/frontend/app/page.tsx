"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PixelCard from "@/components/PixelCard";
import GamePreview from "@/components/GamePreview";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] sm:h-[600px] flex items-center justify-center bg-primary-yellow">
        <div className="absolute inset-0 bg-[url('/patterns/pixel-pattern.png')] bg-repeat opacity-10 z-0"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-pixel text-black mb-6">
              Welcome to <span className="text-white drop-shadow-[0_2px_0px_rgba(0,0,0,0.8)]">verseX</span>
            </h1>
            <p className="text-xl sm:text-2xl font-pixel-body text-black mb-8">
              A pixel-perfect metaverse where you can connect, explore, and create
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/join")}
                className="bg-black text-white hover:bg-gray-800 font-pixel px-6 py-3 text-md sm:text-lg"
              >
                Join a Space
              </Button>
              <Button
                onClick={() => router.push("/explore")}
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white font-pixel px-6 py-3 text-md sm:text-lg"
              >
                Explore Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-pixel text-center mb-12">
            Experience the Pixel Universe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <PixelCard 
              title="Join a Space"
              description="Connect with friends in customized virtual spaces"
              icon="/icons/space-icon.png"
            />
            <PixelCard 
              title="Choose Your Avatar"
              description="Select from Harry Potter or Iron Man themed characters"
              icon="/icons/avatar-icon.png"
            />
            <PixelCard 
              title="Explore verseX"
              description="Discover new worlds and make new connections"
              icon="/icons/explore-icon.png"
            />
          </div>
        </div>
      </section>

      {/* Game Preview Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-pixel text-center mb-8">
            Preview the Experience
          </h2>
          <div className="max-w-4xl mx-auto">
            <GamePreview />
          </div>
        </div>
      </section>

      {/* Avatar Selection Preview */}
      <section className="py-16 bg-primary-yellow">
        <div className="absolute inset-0 bg-[url('/patterns/pixel-pattern.png')] bg-repeat opacity-10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-pixel text-center mb-8">
            Choose Your Character
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs w-full">
              <div className="h-48 w-full flex items-center justify-center mb-4">
                <Image 
                  src="/avatars/harry-preview.png" 
                  width={120} 
                  height={180} 
                  alt="Harry Potter avatar"
                  className="object-contain"
                />
              </div>
              <h3 className="font-pixel text-xl mb-2">Harry Potter</h3>
              <p className="font-pixel-body mb-4">Magical powers and wizard style</p>
              <Button 
                onClick={() => router.push("/avatars")}
                className="bg-black text-white hover:bg-gray-800 font-pixel"
              >
                Select
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs w-full">
              <div className="h-48 w-full flex items-center justify-center mb-4">
                <Image 
                  src="/avatars/ironman-preview.png" 
                  width={120} 
                  height={180} 
                  alt="Iron Man avatar"
                  className="object-contain"
                />
              </div>
              <h3 className="font-pixel text-xl mb-2">Iron Man</h3>
              <p className="font-pixel-body mb-4">Tech suit with special abilities</p>
              <Button 
                onClick={() => router.push("/avatars")}
                className="bg-black text-white hover:bg-gray-800 font-pixel"
              >
                Select
              </Button>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button
              onClick={() => router.push("/avatars")}
              variant="outline" 
              className="border-black text-black hover:bg-black hover:text-white font-pixel"
            >
              View All Avatars
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-pixel mb-6">
            Ready to Enter the Verse?
          </h2>
          <p className="font-pixel-body text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of players already exploring the pixel metaverse
          </p>
          <Button
            onClick={() => router.push("/join")}
            className="bg-primary-yellow text-black hover:bg-yellow-300 font-pixel px-8 py-3 text-lg"
          >
            Start Your Journey
          </Button>
        </div>
      </section>
    </main>
  );
}