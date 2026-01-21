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

  // Theme colors - inactive icons always use gray (buttons.list), active uses theme color
  const inactiveColor = `hsl(${currentTheme.buttons.list})`;
  const activeColor = `hsl(${currentTheme.buttons.active})`;

  // Get color based on active state
  const getIconColor = (active: boolean) => {
    return active ? activeColor : inactiveColor;
  };

  // Menu glow color - always uses the active theme color
  const menuGlowColor = currentTheme.buttons.active;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="relative mx-auto max-w-md">
        <div className="relative flex items-end justify-center">
          {/* Navbar with flat top corners, rounded bottom and sides */}
          <div className="flex w-full items-center justify-around bg-[hsl(var(--nav-background))] px-6 py-4 rounded-b-[2rem] rounded-t-lg"
            style={{
              borderRadius: '12px 12px 32px 32px'
            }}
          >
            {/* Left side buttons */}
            {navItems.slice(0, 2).map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              const color = getIconColor(active);

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center gap-1 active:scale-90 transition-transform duration-150"
                >
                  <Icon
                    className="relative h-7 w-7 transition-all duration-300"
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
            {navItems.slice(2).map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              const color = getIconColor(active);

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center gap-1 active:scale-90 transition-transform duration-150"
                >
                  <Icon
                    className="relative h-7 w-7 transition-all duration-300"
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
              className={`relative flex items-center justify-center w-14 h-14 rounded-full -mt-10 transition-all duration-300 ${
                isMenuOpen || isMenuActive ? 'glow-pulse' : ''
              }`}
              style={{
                background: `hsl(var(--nav-background))`,
                border: `2.5px solid hsl(${menuGlowColor})`,
                boxShadow: isMenuOpen || isMenuActive 
                  ? `0 0 15px 3px hsl(${menuGlowColor}), 0 0 30px 8px hsl(${menuGlowColor} / 0.5), 0 0 45px 12px hsl(${menuGlowColor} / 0.3)`
                  : 'none',
              }}
            >
              <img src={nexusLogo} alt="Menu" className="h-8 w-8" />
            </div>

            <span
              className="text-sm font-medium transition-colors duration-300 mt-1"
              style={{ color: isMenuOpen || isMenuActive ? activeColor : inactiveColor }}
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