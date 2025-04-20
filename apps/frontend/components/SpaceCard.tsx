import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface Space {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  participants: number;
  capacity: number;
}

interface SpaceCardProps {
  space: Space;
  onSelect: () => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space, onSelect }) => {
  const occupancyPercentage = (space.participants / space.capacity) * 100;
  
  return (
    <motion.div 
      className="bg-white border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <div className="relative h-40 w-full">
        <Image
          src={space.thumbnail}
          alt={space.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-pixel text-lg mb-2">{space.name}</h3>
        <p className="font-pixel-body text-gray-700 text-sm mb-3">{space.description}</p>
        
        <div className="flex items-center mb-4">
          <Users size={16} className="mr-2" />
          <div className="flex-1">
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div 
                className={`h-2 rounded-full ${
                  occupancyPercentage > 80 ? 'bg-red-500' : 
                  occupancyPercentage > 50 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${occupancyPercentage}%` }}
              ></div>
            </div>
          </div>
          <span className="ml-2 font-pixel-body text-xs">
            {space.participants}/{space.capacity}
          </span>
        </div>
        
        <Button
          onClick={onSelect}
          className="w-full bg-primary-yellow text-black hover:bg-yellow-400 font-pixel"
        >
          Join
        </Button>
      </div>
    </motion.div>
  );
};

export default SpaceCard;