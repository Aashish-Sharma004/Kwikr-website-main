'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantityCounter({ quantity, onIncrease, onDecrease, size = 'md' }) {
  const isSmall = size === 'sm';

  return (
    <div className={`flex items-center bg-green-600 rounded-lg overflow-hidden ${isSmall ? 'h-7' : 'h-8'}`}>
      <button
        onClick={onDecrease}
        className={`text-white hover:bg-green-700 transition-colors flex items-center justify-center ${isSmall ? 'w-6 h-7' : 'w-8 h-8'}`}
      >
        <Minus size={isSmall ? 12 : 14} />
      </button>
      <span className={`text-white font-bold bg-green-600 flex items-center justify-center ${isSmall ? 'w-6 text-xs' : 'w-8 text-sm'}`}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className={`text-white hover:bg-green-700 transition-colors flex items-center justify-center ${isSmall ? 'w-6 h-7' : 'w-8 h-8'}`}
      >
        <Plus size={isSmall ? 12 : 14} />
      </button>
    </div>
  );
}
