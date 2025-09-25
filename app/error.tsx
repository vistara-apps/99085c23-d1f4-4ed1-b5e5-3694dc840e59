'use client';

import { useEffect } from 'react';
import { FrameWrapper } from './components/FrameWrapper';
import { ActionCTA } from './components/ActionCTA';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <FrameWrapper>
      <div className="text-center space-y-6">
        <div className="glass-card p-6">
          <AlertTriangle className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2 gradient-text">
            Oracle Disruption
          </h2>
          <p className="text-secondary-text text-sm leading-relaxed mb-4">
            The blockchain spirits encountered an unexpected disturbance. The oracle's vision is temporarily clouded.
          </p>
          <p className="text-xs text-secondary-text font-mono">
            Error: {error.message}
          </p>
        </div>
        
        <ActionCTA variant="primary" onClick={reset}>
          Restore Oracle Connection
        </ActionCTA>
      </div>
    </FrameWrapper>
  );
}
