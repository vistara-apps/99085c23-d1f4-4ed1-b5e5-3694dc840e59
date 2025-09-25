'use client';

import { useState } from 'react';
import { FrameWrapper } from './components/FrameWrapper';
import { OracleHeader } from './components/OracleHeader';
import { FortuneDisplay } from './components/FortuneDisplay';
import { ActionCTA } from './components/ActionCTA';
import { NetworkStatus } from './components/NetworkStatus';
import { fetchLatestBlockData } from '@/lib/base-rpc';
import { generateFortune, getFortuneRarity } from '@/lib/fortune-generator';
import { Fortune } from '@/lib/types';
import { Sparkles, Share2, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState(false);
  const [rarity, setRarity] = useState<'common' | 'rare' | 'legendary'>('common');

  const generateNewFortune = async () => {
    setLoading(true);
    
    try {
      // Fetch latest Base network data
      const blockData = await fetchLatestBlockData();
      
      // Generate fortune using onchain data
      const fortuneText = generateFortune({
        blockData,
        randomSeed: Math.random(),
      });
      
      // Determine rarity
      const fortuneRarity = getFortuneRarity(blockData);
      
      // Create fortune object
      const newFortune: Fortune = {
        id: `fortune_${Date.now()}`,
        userId: 'anonymous',
        fortuneText,
        onchainDataSource: `Base Block #${blockData.blockNumber}`,
        onchainDataValue: blockData.blockHash,
        timestamp: Date.now(),
        blockNumber: blockData.blockNumber,
      };
      
      setFortune(newFortune);
      setRarity(fortuneRarity);
      
    } catch (error) {
      console.error('Failed to generate fortune:', error);
      
      // Fallback fortune
      const fallbackFortune: Fortune = {
        id: `fortune_${Date.now()}`,
        userId: 'anonymous',
        fortuneText: "The blockchain spirits are temporarily clouded, but your destiny remains bright. Try again when the network clears.",
        onchainDataSource: "Oracle Fallback",
        onchainDataValue: "0x000...fallback",
        timestamp: Date.now(),
      };
      
      setFortune(fallbackFortune);
      setRarity('common');
    } finally {
      setLoading(false);
    }
  };

  const shareFortune = async () => {
    if (!fortune) return;
    
    const shareText = `🔮 My Onchain Oracle fortune: "${fortune.fortuneText}" \n\nGenerated from ${fortune.onchainDataSource} ⛓️`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Onchain Oracle Fortune',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Fortune copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy to clipboard');
      }
    }
  };

  return (
    <FrameWrapper>
      <div className="space-y-6">
        {/* Header */}
        <OracleHeader />
        
        {/* Network Status */}
        <NetworkStatus />
        
        {/* Fortune Display or Welcome */}
        {fortune ? (
          <FortuneDisplay 
            fortune={fortune} 
            variant="compact"
            rarity={rarity}
          />
        ) : (
          <div className="glass-card p-6 text-center">
            <div className="mb-4">
              <Sparkles className="w-12 h-12 text-accent mx-auto mb-3 animate-float" />
            </div>
            <h2 className="text-xl font-semibold mb-2 gradient-text">
              Seek Your Fortune
            </h2>
            <p className="text-secondary-text text-sm leading-relaxed">
              The Base network holds the keys to your destiny. Click below to reveal a fortune generated from live blockchain data.
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <ActionCTA
            variant="primary"
            onClick={generateNewFortune}
            loading={loading}
            disabled={loading}
          >
            {loading ? (
              'Consulting the Oracle...'
            ) : fortune ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Reveal New Fortune
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Get My Fortune
              </>
            )}
          </ActionCTA>
          
          {fortune && (
            <ActionCTA
              variant="secondary"
              onClick={shareFortune}
            >
              <Share2 className="w-4 h-4" />
              Share Fortune
            </ActionCTA>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center text-xs text-secondary-text">
          <p>Powered by Base Network • Verifiable • Onchain</p>
        </div>
      </div>
    </FrameWrapper>
  );
}
