import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface GameMenuProps {
  onClose: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onClose }) => {
  const router = useRouter();
  
  const handleExitGame = () => {
    router.push('/');
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] w-80">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-pixel text-xl">Menu</h3>
        <button 
          onClick={onClose}
          className="p-1"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-4">
        <Button
          className="w-full bg-primary-yellow text-black hover:bg-yellow-400 font-pixel justify-start"
          onClick={onClose}
        >
          Return to Game
        </Button>
        
        <Button
          className="w-full bg-white text-black hover:bg-gray-100 border-2 border-black font-pixel justify-start"
          variant="outline"
          onClick={() => {
            // This would open settings in a real implementation
            console.log('Open settings');
            onClose();
          }}
        >
          Settings
        </Button>
        
        <Button
          className="w-full bg-white text-black hover:bg-gray-100 border-2 border-black font-pixel justify-start"
          variant="outline"
          onClick={() => {
            // This would open the avatar selection in a real implementation
            router.push('/avatars');
          }}
        >
          Change Avatar
        </Button>
        
        <Button
          className="w-full bg-black text-white hover:bg-gray-800 font-pixel justify-start"
          onClick={handleExitGame}
        >
          Exit Game
        </Button>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="font-pixel-body text-sm text-gray-600 text-center">
          verseX Beta - v0.1.0
        </p>
      </div>
    </div>
  );
};

export default GameMenu;