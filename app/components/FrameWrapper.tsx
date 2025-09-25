'use client';

import { ReactNode } from 'react';

interface FrameWrapperProps {
  children: ReactNode;
  variant?: 'default';
  className?: string;
}

export function FrameWrapper({ 
  children, 
  variant = 'default',
  className = '' 
}: FrameWrapperProps) {
  return (
    <div className={`
      min-h-screen bg-gradient-to-br from-bg via-surface to-bg
      flex flex-col items-center justify-center p-4
      ${className}
    `}>
      <div className="w-full max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
}
