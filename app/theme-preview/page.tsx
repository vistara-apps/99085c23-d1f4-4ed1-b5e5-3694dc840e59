'use client';

import { useTheme } from '../components/ThemeProvider';
import { FrameWrapper } from '../components/FrameWrapper';
import { OracleHeader } from '../components/OracleHeader';
import { FortuneDisplay } from '../components/FortuneDisplay';
import { ActionCTA } from '../components/ActionCTA';
import { NetworkStatus } from '../components/NetworkStatus';
import { Fortune } from '@/lib/types';

const sampleFortune: Fortune = {
  id: 'sample',
  userId: 'preview',
  fortuneText: "The blockchain whispers of prosperity ahead. Block #12345678 reveals your path to financial abundance through the wisdom of decentralized networks.",
  onchainDataSource: "Base Block #12345678",
  onchainDataValue: "0x1234...abcd",
  timestamp: Date.now(),
  blockNumber: 12345678,
};

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Professional Finance', description: 'Dark navy + gold accents' },
    { id: 'celo', name: 'Celo', description: 'Black + yellow accents' },
    { id: 'solana', name: 'Solana', description: 'Purple + magenta accents' },
    { id: 'base', name: 'Base', description: 'Dark blue + Base blue' },
    { id: 'coinbase', name: 'Coinbase', description: 'Navy + Coinbase blue' },
  ] as const;

  return (
    <FrameWrapper>
      <div className="space-y-6">
        {/* Theme Selector */}
        <div className="glass-card p-4">
          <h2 className="text-lg font-semibold mb-4 text-center gradient-text">
            Theme Preview
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`
                  p-3 rounded-lg text-left transition-all duration-200
                  ${theme === t.id 
                    ? 'bg-accent bg-opacity-20 border border-accent' 
                    : 'bg-surface hover:bg-opacity-80'
                  }
                `}
              >
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-secondary-text">{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Components */}
        <OracleHeader />
        <NetworkStatus />
        <FortuneDisplay fortune={sampleFortune} rarity="rare" />
        
        <div className="space-y-3">
          <ActionCTA variant="primary">
            Primary Action
          </ActionCTA>
          <ActionCTA variant="secondary">
            Secondary Action
          </ActionCTA>
        </div>
      </div>
    </FrameWrapper>
  );
}
