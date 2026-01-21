import { cn } from "@/lib/utils";

export interface ThemeColors {
  name: string;
  buttons: {
    list: string; // inactive/default button color (HSL values)
    active: string; // active button color (HSL values)
  };
  accent?: string; // secondary accent color (optional - for dual-color themes)
}

// Define themes based on the structure shown in your image
export const themes: ThemeColors[] = [
  {
    name: "Harvest",
    buttons: {
      list: "0 0% 60%", // gray for inactive
      active: "25 95% 53%", // orange for active
    },
  },
  {
    name: "Ocean",
    buttons: {
      list: "200 15% 50%", // muted blue-gray
      active: "200 80% 55%", // vibrant blue
    },
  },
  {
    name: "Forest",
    buttons: {
      list: "120 10% 45%", // muted gray-green
      active: "145 65% 45%", // vibrant green
    },
  },
  {
    name: "Sunset",
    buttons: {
      list: "0 0% 60%", // gray
      active: "350 85% 55%", // red-pink
    },
    accent: "35 95% 55%", // orange accent
  },
  {
    name: "Purple",
    buttons: {
      list: "270 15% 50%", // muted purple-gray
      active: "270 70% 60%", // vibrant purple
    },
  },
  {
    name: "Neon",
    buttons: {
      list: "180 20% 40%", // muted teal
      active: "175 100% 50%", // cyan neon
    },
    accent: "320 100% 60%", // magenta accent
  },
  {
    name: "Gold",
    buttons: {
      list: "40 15% 45%", // muted tan
      active: "45 90% 50%", // gold
    },
  },
  {
    name: "Rose",
    buttons: {
      list: "0 10% 55%", // muted rose-gray
      active: "340 75% 60%", // rose pink
    },
  },
];

interface ThemeTesterProps {
  currentTheme: string;
  onThemeChange: (theme: ThemeColors) => void;
}

const ThemeTester = ({ currentTheme, onThemeChange }: ThemeTesterProps) => {
  return (
    <div className="w-full px-4 pt-4">
      <h2 className="text-sm font-medium text-muted-foreground mb-3">Theme Tester</h2>
      <div className="flex flex-wrap gap-3">
        {themes.map((theme) => {
          const isActive = currentTheme === theme.name;
          return (
            <button
              key={theme.name}
              onClick={() => onThemeChange(theme)}
              className={cn(
                "flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-card ring-2 ring-primary" 
                  : "hover:bg-card/50"
              )}
            >
              {/* Color preview circle(s) */}
              <div className="flex items-center gap-1">
                {/* Active color */}
                <div 
                  className="w-6 h-6 rounded-full border border-border"
                  style={{ backgroundColor: `hsl(${theme.buttons.active})` }}
                />
                {/* Show accent if dual-color theme */}
                {theme.accent && (
                  <div 
                    className="w-6 h-6 rounded-full border border-border"
                    style={{ backgroundColor: `hsl(${theme.accent})` }}
                  />
                )}
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {theme.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeTester;
