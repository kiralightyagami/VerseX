import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PixelCardProps {
  title: string;
  description: string;
  icon: string;
}

const PixelCard: React.FC<PixelCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div 
      className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative w-16 h-16 mb-4">
          <Image
            src={icon}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="font-pixel text-lg mb-2">{title}</h3>
        <p className="font-pixel-body text-gray-700">{description}</p>
      </div>
    </motion.div>
  );
};

export default PixelCard;