"use client";

import React, { createContext, useContext, ReactNode } from 'react';

export type GradientMode = 'light2';

interface GradientModeContextType {
  mode: GradientMode;
  getGradientClasses: (industry?: string) => string;
  getTextClasses: () => string;
  getTextSecondaryClasses: () => string;
}

const GradientModeContext = createContext<GradientModeContextType | undefined>(undefined);

interface GradientModeProviderProps {
  children: ReactNode;
}

export const GradientModeProvider: React.FC<GradientModeProviderProps> = ({ children }) => {
  // Always use light2 mode
  const mode: GradientMode = 'light2';

  const getGradientClasses = (industry?: string): string => {
    const baseGradients = {
      default: 'from-[#115B87] via-[#1b3764] to-[#1b3764]',
      marine: 'from-[#137875] via-[#1b3764] to-[#1b3764]',
      industrial: 'from-[#F16A26] via-[#1b3764] to-[#1b3764]',
      transportation: 'from-[#b83d35] via-[#1b3764] to-[#1b3764]',
      construction: 'from-[#fec770] via-[#1b3764] to-[#1b3764]',
      composites: 'from-[#c7c8c9] via-[#1b3764] to-[#1b3764]',
      insulation: 'from-[#d0157d] via-[#1b3764] to-[#1b3764]'
    };

    const industryKey = industry?.toLowerCase() as keyof typeof baseGradients;
    return baseGradients[industryKey] || baseGradients.default;
  };

  const getTextClasses = (): string => {
    return 'text-white';
  };

  const getTextSecondaryClasses = (): string => {
    return 'text-white/90';
  };

  const value: GradientModeContextType = {
    mode,
    getGradientClasses,
    getTextClasses,
    getTextSecondaryClasses
  };

  return (
    <GradientModeContext.Provider value={value}>
      {children}
    </GradientModeContext.Provider>
  );
};

export const useGradientMode = (): GradientModeContextType => {
  const context = useContext(GradientModeContext);
  if (context === undefined) {
    throw new Error('useGradientMode must be used within a GradientModeProvider');
  }
  return context;
};

