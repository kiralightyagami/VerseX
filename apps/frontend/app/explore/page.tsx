"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Mock data for spaces
const exploreSpaces = [
  {
    id: 'world-1',
    name: 'Wizard School',
    description: 'A magical school with classrooms, great hall, and dormitories',
    image: '/worlds/wizard-school.png',
    category: 'Fantasy',
  },
  {
    id: 'world-2',
    name: 'Tech Campus',
    description: 'A futuristic tech campus with labs and innovation centers',
    image: '/worlds/tech-campus.png',
    category: 'Sci-Fi',
  },
  {
    id: 'world-3',
    name: 'Pixel Office',
    description: 'A modern office space for virtual teams to collaborate',
    image: '/worlds/pixel-office.png',
    category: 'Work',
  },
  {
    id: 'world-4',
    name: 'Game Arcade',
    description: 'A retro game arcade with playable mini-games',
    image: '/worlds/game-arcade.png',
    category: 'Entertainment',
  },
  {
    id: 'world-5',
    name: 'Forest Adventure',
    description: 'An enchanted forest with hidden treasures to discover',
    image: '/worlds/forest.png',
    category: 'Adventure',
  },
  {
    id: 'world-6',
    name: 'Space Station',
    description: 'An orbital space station with views of Earth and beyond',
    image: '/worlds/space-station.png',
    category: 'Sci-Fi',
  },
];

const categories = [
  'All', 'Fantasy', 'Sci-Fi', 'Work', 'Entertainment', 'Adventure'
];

export default function ExplorePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = React.useState('All');
  
  const filteredSpaces = activeCategory === 'All' 
    ? exploreSpaces 
    : exploreSpaces.filter(space => space.category === activeCategory);

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-primary-yellow py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-pixel text-2xl sm:text-3xl mb-6 text-center">
            Explore Virtual Worlds
          </h1>
          <p className="font-pixel-body text-center max-w-2xl mx-auto mb-8">
            Discover amazing pixelated worlds created by our community. Join existing spaces or get inspired to create your own!
          </p>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 font-pixel text-sm ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-black border-2 border-black hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpaces.map((space) => (
            <motion.div
              key={space.id}
              className="bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-black px-3 py-1">
                  <span className="font-pixel-body text-white text-xs">
                    {space.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-pixel text-xl mb-2">{space.name}</h3>
                <p className="font-pixel-body text-gray-700 mb-4">
                  {space.description}
                </p>
                <Button
                  onClick={() => router.push(`/game?world=${space.id}`)}
                  className="w-full bg-primary-yellow text-black hover:bg-yellow-400 font-pixel"
                >
                  Visit World
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-pixel text-2xl mb-6">Can't find what you're looking for?</h2>
          <p className="font-pixel-body text-gray-700 mb-6 max-w-2xl mx-auto">
            Create your own custom world with our easy-to-use world builder
          </p>
          <Button
            onClick={() => router.push('/create')}
            className="bg-black text-white hover:bg-gray-800 font-pixel"
          >
            Create World
          </Button>
        </div>
      </div>
    </main>
  );
}