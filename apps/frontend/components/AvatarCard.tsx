import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface Avatar {
  id: string;
  name: string;
  image: string;
  locked: boolean;
}

interface AvatarCardProps {
  avatar: Avatar;
  isSelected: boolean;
  onSelect: (avatarId: string) => void;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ avatar, isSelected, onSelect }) => {
  return (
    <motion.div 
      className={`bg-white border-4 ${
        isSelected ? 'border-primary-yellow' : 'border-black'
      } overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={avatar.image}
          alt={avatar.name}
          fill
          className="object-contain"
        />
        {avatar.locked && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <Lock size={32} className="mx-auto mb-2" />
              <p className="font-pixel text-sm">Locked</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-pixel text-center text-lg mb-3">{avatar.name}</h3>
        
        <Button
          onClick={() => !avatar.locked && onSelect(avatar.id)}
          disabled={avatar.locked}
          className={`w-full ${
            isSelected 
              ? 'bg-primary-yellow text-black hover:bg-yellow-400' 
              : avatar.locked 
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
          } font-pixel`}
        >
          {isSelected ? 'Selected' : avatar.locked ? 'Locked' : 'Select'}
        </Button>
      </div>
    </motion.div>
  );
};

export default AvatarCard;