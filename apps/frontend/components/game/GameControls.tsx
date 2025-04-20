import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const GameControls: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-2 bg-black bg-opacity-50 p-2 rounded-lg">
      <div className="col-start-2">
        <button
          className="w-12 h-12 flex items-center justify-center bg-white rounded-lg active:bg-gray-300"
          onTouchStart={() => {
            // In a real implementation, this would trigger the up movement
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
          }}
          onTouchEnd={() => {
            window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowUp' }));
          }}
        >
          <ArrowUp />
        </button>
      </div>
      <div className="col-start-1 row-start-2">
        <button
          className="w-12 h-12 flex items-center justify-center bg-white rounded-lg active:bg-gray-300"
          onTouchStart={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
          }}
          onTouchEnd={() => {
            window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft' }));
          }}
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="col-start-2 row-start-2">
        <button
          className="w-12 h-12 flex items-center justify-center bg-white rounded-lg active:bg-gray-300"
          onTouchStart={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          }}
          onTouchEnd={() => {
            window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));
          }}
        >
          <ArrowDown />
        </button>
      </div>
      <div className="col-start-3 row-start-2">
        <button
          className="w-12 h-12 flex items-center justify-center bg-white rounded-lg active:bg-gray-300"
          onTouchStart={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
          }}
          onTouchEnd={() => {
            window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight' }));
          }}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default GameControls;