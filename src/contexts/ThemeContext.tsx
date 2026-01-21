import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ThemeColors {
  name: string;
  buttons: {
    list: string;
    active: string;
  };
  accent?: string;
}

// All 23 themes - some with dual colors (accent)
export const themes: ThemeColors[] = [
  { name: "Harvest", buttons: { list: "0 0% 60%", active: "25 95% 53%" } },
  { name: "Ocean", buttons: { list: "200 15% 50%", active: "200 80% 55%" } },
  { name: "Forest", buttons: { list: "120 10% 45%", active: "145 65% 45%" } },
  { name: "Sunset", buttons: { list: "0 0% 60%", active: "350 85% 55%" }, accent: "35 95% 55%" },
  { name: "Purple", buttons: { list: "270 15% 50%", active: "270 70% 60%" } },
  { name: "Neon", buttons: { list: "180 20% 40%", active: "175 100% 50%" }, accent: "320 100% 60%" },
  { name: "Gold", buttons: { list: "40 15% 45%", active: "45 90% 50%" } },
  { name: "Rose", buttons: { list: "0 10% 55%", active: "340 75% 60%" } },
  { name: "Coral", buttons: { list: "15 20% 50%", active: "16 85% 60%" } },
  { name: "Lavender", buttons: { list: "260 15% 55%", active: "260 60% 70%" } },
  { name: "Mint", buttons: { list: "150 15% 45%", active: "160 50% 55%" } },
  { name: "Ruby", buttons: { list: "0 15% 45%", active: "0 75% 50%" }, accent: "330 80% 55%" },
  { name: "Sapphire", buttons: { list: "220 20% 45%", active: "220 80% 55%" }, accent: "260 70% 60%" },
  { name: "Emerald", buttons: { list: "140 15% 40%", active: "140 70% 45%" } },
  { name: "Amber", buttons: { list: "30 20% 45%", active: "38 95% 50%" }, accent: "15 90% 55%" },
  { name: "Teal", buttons: { list: "180 15% 40%", active: "180 70% 45%" }, accent: "200 75% 50%" },
  { name: "Crimson", buttons: { list: "350 15% 45%", active: "350 80% 50%" }, accent: "20 90% 55%" },
  { name: "Indigo", buttons: { list: "240 20% 45%", active: "240 70% 55%" }, accent: "280 65% 60%" },
  { name: "Lime", buttons: { list: "80 15% 40%", active: "80 70% 50%" }, accent: "120 60% 45%" },
  { name: "Magenta", buttons: { list: "300 15% 45%", active: "300 75% 55%" }, accent: "330 80% 60%" },
  { name: "Sky", buttons: { list: "190 15% 50%", active: "195 85% 55%" }, accent: "210 80% 60%" },
  { name: "Peach", buttons: { list: "20 20% 55%", active: "25 80% 65%" }, accent: "350 70% 60%" },
  { name: "Slate", buttons: { list: "210 10% 50%", active: "210 40% 60%" } },
];

interface ThemeContextType {
  currentTheme: ThemeColors;
  setTheme: (theme: ThemeColors) => void;
  saveTheme: () => void;
  isSaved: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(() => {
    const saved = localStorage.getItem("selectedTheme");
    if (saved) {
      const found = themes.find((t) => t.name === saved);
      if (found) return found;
    }
    return themes[0];
  });
  const [isSaved, setIsSaved] = useState(true);

  const setTheme = (theme: ThemeColors) => {
    setCurrentTheme(theme);
    setIsSaved(false);
  };

  const saveTheme = () => {
    localStorage.setItem("selectedTheme", currentTheme.name);
    setIsSaved(true);
  };

  // Apply theme CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-glow", currentTheme.buttons.active);
    document.documentElement.style.setProperty("--primary", currentTheme.buttons.active);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, saveTheme, isSaved }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
