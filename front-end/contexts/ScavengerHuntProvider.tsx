import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define a type for each scavenger hunt item.
export interface ScavengerHuntItem {
  name: string;
  clue: string;
  photoObject: string;
  gps: string;
  radius: string;
}

export interface ScavengerHuntContextType {
  scavengerHunt: ScavengerHuntItem[];
  setScavengerHunt: React.Dispatch<React.SetStateAction<ScavengerHuntItem[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Dummy scavenger hunt data.
const dummyData: ScavengerHuntItem[] = [
  {
    name: "Centennial Arch",
    clue: "I stand as a gateway, a symbol of might,\nCelebrating a century, a glorious sight.\nFind my majestic curve, a photo to take,\nA piece of S&T history, for goodness sake!",
    photoObject: "A clear photo of the entire Centennial Arch, showing its curve and details.",
    gps: "37.7840, -92.1020", 
    radius: "50"
  },
  {
    name: "Havener Center",
    clue: "Where students convene and ideas ignite,\nA hub of activity, both day and night.\nCapture its facade, a modern design,\nAnd your second clue, you will surely find!",
    photoObject: "A photo of the Havener Center's main entrance or a significant portion of its exterior.",
    gps: "37.7835, -92.1000", 
    radius: "75"
  },
  {
    name: "The Curtis Laws Wilson Library",
    clue: "Seek knowledge's abode, where wisdom resides,\nWith stacks of information, knowledge presides.\nSnap a picture of its entrance so grand,\nThen on to the final location, take a stand!",
    photoObject: "A picture of the main entrance to the Curtis Laws Wilson Library, including the library's name clearly visible.",
    gps: "37.7828, -92.1017", 
    radius: "100"
  }
];

export const ScavengerHuntContext = createContext<ScavengerHuntContextType | undefined>(undefined);

interface ScavengerHuntProviderProps {
  children: ReactNode;
}

export const ScavengerHuntProvider: React.FC<ScavengerHuntProviderProps> = ({ children }) => {
  const [scavengerHunt, setScavengerHunt] = useState<ScavengerHuntItem[]>(dummyData);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <ScavengerHuntContext.Provider 
      value={{
        scavengerHunt,
        setScavengerHunt,
        currentIndex,
        setCurrentIndex,
      }}
    >
      {children}
    </ScavengerHuntContext.Provider>
  );
};

// Custom hook to simplify context usage.
export function useScavengerHuntContext(): ScavengerHuntContextType {
  const context = useContext(ScavengerHuntContext);
  if (!context) {
    throw new Error('useScavengerHuntContext must be used within a ScavengerHuntProvider.');
  }
  return context;
}