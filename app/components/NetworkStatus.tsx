'use client';

import { useState, useEffect } from 'react';
import { Activity, Zap } from 'lucide-react';
import { OnchainData } from '@/lib/types';
import { fetchLatestBlockData } from '@/lib/base-rpc';

export function NetworkStatus() {
  const [networkData, setNetworkData] = useState<OnchainData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNetworkData = async () => {
      try {
        const data = await fetchLatestBlockData();
        setNetworkData(data);
      } catch (error) {
        console.error('Failed to load network data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNetworkData();
    
    // Update every 30 seconds
    const interval = setInterval(loadNetworkData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !networkData) {
    return (
      <div className="glass-card p-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-surface rounded w-24"></div>
          <div className="h-4 bg-surface rounded w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          <span className="text-secondary-text">Base Network</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-accent" />
            <span className="font-mono text-xs">
              #{networkData.blockNumber.toLocaleString()}
            </span>
          </div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
