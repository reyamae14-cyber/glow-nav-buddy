import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import nexusLogo from "@/assets/nexus-logo.svg";
import { cn } from "@/lib/utils";
import MenuPopup from "./MenuPopup";
import { useTheme } from "@/contexts/ThemeContext";

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
  path: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "search", label: "Search", icon: Search, path: "/search" },
  { id: "recent", label: "Recent", icon: History, path: "/recent" },
  { id: "profile", label: "Profile", icon: User, path: "/profile" },
];

/**
 * MobileNavBar Component
 * 
 * A 5-button mobile navigation bar with:
 * - 4 icon buttons (Home, Search, Recent, Profile)
 * - 1 center Menu button with glow effect
 * 
 * Theme Integration:
 * - Uses CSS variables from ThemeContext
 * - --nav-inactive: Color for inactive icons (buttons.list)
 * - --nav-active: Color for active icons (buttons.active)
 * - --nav-accent: Secondary color for dual-color themes (accent or fallback to active)
 * - --nav-glow: Glow color for menu button
 * 
 * To integrate into your project:
 * 1. Copy this file to src/components/MobileNavBar.tsx
 * 2. Copy MenuPopup.tsx to src/components/MenuPopup.tsx
 * 3. Copy ThemeContext.tsx to src/contexts/ThemeContext.tsx
 * 4. Wrap your app with <ThemeProvider> in main.tsx
 * 5. Add the CSS variables to your index.css (see nav-* variables)
 * 6. Import and use <MobileNavBar /> in your layout (exclude settings/onboarding pages)
 */
const MobileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = location.pathname === "/menu";

  // Get theme colors
  const inactiveColor = `hsl(${currentTheme.buttons.list})`;
  const activeColor = `hsl(${currentTheme.buttons.active})`;
  const accentColor = currentTheme.accent ? `hsl(${currentTheme.accent})` : activeColor;

  // For dual-color themes, alternate active colors between items
  const getActiveColor = (index: number) => {
    if (currentTheme.accent) {
      return index % 2 === 0 ? activeColor : accentColor;
    }
    return activeColor;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="relative mx-auto max-w-md">
        <div className="relative flex items-end justify-center">
          <div className="flex w-full items-center justify-around rounded-[2rem] bg-[hsl(var(--nav-background))] px-6 py-4">
            {/* Left side buttons */}
            {navItems.slice(0, 2).map((item, index) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              const color = active ? getActiveColor(index) : inactiveColor;

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center gap-1 active:scale-90 transition-transform duration-150"
                >
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active && "glow-orange"
                    )}
                    style={{ color }}
                    strokeWidth={active ? 2.5 : 1.5}
                  />
                  <span
                    className="text-sm font-medium transition-colors duration-300"
                    style={{ color }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* Center Menu button - spacer */}
            <div className="w-20" />

            {/* Right side buttons */}
            {navItems.slice(2).map((item, index) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              // Continue index from left side (2, 3 for right side)
              const color = active ? getActiveColor(index + 2) : inactiveColor;

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center gap-1 active:scale-90 transition-transform duration-150"
                >
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active && "glow-orange"
                    )}
                    style={{ color }}
                    strokeWidth={active ? 2.5 : 1.5}
                  />
                  <span
                    className="text-sm font-medium transition-colors duration-300"
                    style={{ color }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Center Menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col items-center active:scale-95 transition-transform duration-150"
          >
            <div
              className="relative flex items-center justify-center w-14 h-14 rounded-full glow-pulse -mt-10"
              style={{
                background: `hsl(var(--nav-background))`,
                boxShadow: `0 0 15px 3px hsl(var(--nav-glow)), 0 0 30px 8px hsl(var(--nav-glow) / 0.5), 0 0 45px 12px hsl(var(--nav-glow) / 0.3)`,
              }}
            >
              <img src={nexusLogo} alt="Menu" className="h-7 w-7" />
            </div>

            <span
              className={cn(
                "text-sm font-medium transition-colors duration-300 mt-1",
                isMenuActive || isMenuOpen ? "text-primary" : "text-[hsl(var(--nav-foreground))]",
              )}
            >
              Menu
            </span>
          </button>
        </div>
      </div>
      
      {/* Menu Popup */}
      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
};

export default MobileNavBar;