'use client';

import { Fortune } from '@/lib/types';
import { Sparkles, Clock, Hash } from 'lucide-react';

interface FortuneDisplayProps {
  fortune: Fortune;
  variant?: 'compact';
  rarity?: 'common' | 'rare' | 'legendary';
}

export function FortuneDisplay({ 
  fortune, 
  variant = 'compact',
  rarity = 'common' 
}: FortuneDisplayProps) {
  const rarityStyles = {
    common: 'border-accent border-opacity-30',
    rare: 'border-accent border-opacity-60 shadow-lg',
    legendary: 'border-accent border-opacity-100 shadow-xl animate-pulse-slow'
  };

  const rarityGlow = {
    common: '',
    rare: 'oracle-glow',
    legendary: 'oracle-glow animate-float'
  };

  return (
    <div className={`
      fortune-card ${rarityStyles[rarity]} ${rarityGlow[rarity]}
      ${variant === 'compact' ? 'p-4' : 'p-6'}
    `}>
      {/* Rarity Indicator */}
      <div className="flex items-center justify-center mb-4">
        <div className={`
          flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
          ${rarity === 'legendary' ? 'bg-accent bg-opacity-20 text-accent' :
            rarity === 'rare' ? 'bg-accent bg-opacity-10 text-accent' :
            'bg-surface text-secondary-text'}
        `}>
          <Sparkles className="w-3 h-3" />
          {rarity.charAt(0).toUpperCase() + rarity.slice(1)} Fortune
        </div>
      </div>

      {/* Fortune Text */}
      <div className="mb-6">
        <p className={`
          text-center leading-relaxed
          ${variant === 'compact' ? 'text-sm' : 'text-base'}
          ${rarity === 'legendary' ? 'gradient-text font-medium' : 'text-fg'}
        `}>
          {fortune.fortuneText}
        </p>
      </div>

      {/* Onchain Data Source */}
      <div className="space-y-2 text-xs text-secondary-text">
        <div className="flex items-center justify-center gap-2">
          <Hash className="w-3 h-3" />
          <span>Source: {fortune.onchainDataSource}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-3 h-3" />
          <span>
            {new Date(fortune.timestamp).toLocaleString()}
          </span>
        </div>
        {fortune.blockNumber && (
          <div className="text-center">
            <span className="font-mono">Block #{fortune.blockNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
}
