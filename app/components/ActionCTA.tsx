'use client';

import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ActionCTAProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function ActionCTA({ 
  children, 
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  className = '' 
}: ActionCTAProps) {
  const baseStyles = "w-full py-4 px-6 rounded-lg font-semibold text-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variantStyles = {
    primary: "btn-primary",
    secondary: "btn-secondary"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
