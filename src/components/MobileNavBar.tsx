import { useState, useEffect, useCallback } from "react";
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
 */
const MobileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setThemeUpdate] = useState(0);

  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = location.pathname === "/menu";

  // Read colors from CSS variables
  const getComputedColor = useCallback((varName: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return value || fallback;
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      setThemeUpdate((prev) => prev + 1);
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

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

          {/* Center Menu button - floating circle (z-[80] to stay above popup) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute left-1/2 -translate-x-1/2 -top-9 z-[80] flex items-center justify-center active:scale-95 transition-transform duration-150"
          >
            <div
              className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full glow-pulse"
              style={{
                background: `hsl(var(--colors-background-main, 0 0% 8%))`,
                boxShadow: `0 0 15px 3px hsl(${menuGlowColor}), 0 0 30px 8px hsl(${menuGlowColor} / 0.5), 0 0 45px 12px hsl(${menuGlowColor} / 0.3)`,
              }}
            >
              <img src={nexusLogo} alt="Menu" className="h-9 w-9" />
            </div>
          </button>

          {/* Menu text label - aligned with other nav labels */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col items-center"
          >
            <span
              className="text-sm font-medium transition-colors duration-300"
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
