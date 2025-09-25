'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'celo' | 'solana' | 'base' | 'coinbase';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    // Get theme from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme') as Theme;
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    const initialTheme = urlTheme || savedTheme || 'default';
    setTheme(initialTheme);
    
    // Apply theme to document
    if (initialTheme !== 'default') {
      document.documentElement.setAttribute('data-theme', initialTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme !== 'default') {
      document.documentElement.setAttribute('data-theme', newTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
