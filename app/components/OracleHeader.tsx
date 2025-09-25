'use client';

import { Eye, Sparkles } from 'lucide-react';

export function OracleHeader() {
  return (
    <div className="text-center mb-8">
      {/* Oracle Eye Icon */}
      <div className="relative mb-6">
        <div className="oracle-glow mx-auto w-20 h-20 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center animate-pulse-slow">
          <Eye className="w-10 h-10 text-bg" />
        </div>
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-6 h-6 text-accent animate-float" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">
        <span className="gradient-text">Onchain Oracle</span>
      </h1>
      
      {/* Tagline */}
      <p className="text-secondary-text text-sm max-w-xs mx-auto leading-relaxed">
        Uncover your blockchain destiny with personalized, verifiable fortunes powered by Base network data.
      </p>
    </div>
  );
}
