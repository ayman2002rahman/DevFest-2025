import React, { createContext, useState, ReactNode } from 'react';

interface ScavengerHuntContextType {
  scavengerHunt: string[];
  setScavengerHunt: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ScavengerHuntContext = createContext<ScavengerHuntContextType | undefined>(undefined);

interface ScavengerHuntProviderProps {
  children: ReactNode;
}

export const ScavengerHuntProvider: React.FC<ScavengerHuntProviderProps> = ({ children }) => {
  const [scavengerHunt, setScavengerHunt] = useState<string[]>([
    'Item 1',
    'Item 2',
    'Item 3',
  ]);

  return (
    <ScavengerHuntContext.Provider value={{ scavengerHunt, setScavengerHunt }}>
      {children}
    </ScavengerHuntContext.Provider>
  );
};
