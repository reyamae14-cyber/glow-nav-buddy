import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import nexusLogo from "@/assets/nexus-logo.svg";
import MenuPopup from "./MenuPopup";

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
 * MobileNavBar Component for p-stream
 * 
 * This component reads theme colors from CSS variables that p-stream's
 * theme store injects into the document. No additional context needed.
 * 
 * Required CSS variables (injected by p-stream's theme system):
 * - --nav-background: Background color of the navbar (dark)
 * - --nav-foreground: Text color for the navbar
 * - --colors-buttons-list: Inactive icon/text color (gray)
 * - --colors-buttons-active: Active icon/text color (theme primary)
 * - --colors-accent: Optional secondary color for dual-color themes
 * 
 * Fallback: If CSS variables are not set, uses default gray/orange colors.
 */
const MobileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = location.pathname === "/menu";

  // Read colors from CSS variables (set by p-stream's theme store)
  // Fallback to default gray/orange if not set
  const getComputedColor = (varName: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return value || fallback;
  };

  // p-stream theme CSS variables mapping
  const inactiveHsl = getComputedColor("--colors-buttons-list", "0 0% 60%");
  const activeHsl = getComputedColor("--colors-buttons-active", "25 95% 53%");
  
  const inactiveColor = `hsl(${inactiveHsl})`;
  const activeColor = `hsl(${activeHsl})`;
  const menuGlowColor = activeHsl;

  const getIconColor = (active: boolean) => active ? activeColor : inactiveColor;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="relative">
        <div className="relative flex items-end justify-center">
          {/* Navbar edge-to-edge */}
          <div 
            className="flex w-full items-center justify-evenly py-4"
            style={{
              background: `hsl(var(--colors-background-main, 0 0% 8%))`,
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
              className="relative flex items-center justify-center w-14 h-14 rounded-full glow-pulse -mt-10"
              style={{
                background: `hsl(var(--colors-background-main, 0 0% 8%))`,
                boxShadow: `0 0 15px 3px hsl(${menuGlowColor}), 0 0 30px 8px hsl(${menuGlowColor} / 0.5), 0 0 45px 12px hsl(${menuGlowColor} / 0.3)`,
              }}
            >
              <img src={nexusLogo} alt="Menu" className="h-7 w-7" />
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
