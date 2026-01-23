import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import nexusLogo from "@/assets/nexus-logo.svg";
import MenuPopup from "./MenuPopup";

/**
 * ========================================
 * P-STREAM MOBILE NAVIGATION BAR
 * ========================================
 * 
 * INTEGRATION INSTRUCTIONS:
 * 1. Copy this file and MenuPopup.tsx to your project
 * 2. Copy nexus-logo.svg to src/assets/
 * 3. Add <MobileNavBar /> at the root layout level
 * 4. Ensure main content has padding-bottom: 6rem (pb-24)
 * 
 * THEME CONNECTION:
 * Inject these CSS variables to :root from your theme store:
 * --colors-buttons-list: HSL values for inactive (e.g., "0 0% 60%")
 * --colors-buttons-active: HSL values for active (e.g., "25 95% 53%")
 * Then dispatch: window.dispatchEvent(new Event("theme-change"))
 * 
 * LOCKED SPECIFICATIONS (DO NOT MODIFY):
 * - Navbar background: Always #000000 (pure black)
 * - Menu button: 72x72px, positioned -top-9
 * - Icons: h-7 w-7, Logo: h-9 w-9
 * - Z-index: Button(80) > Popup(70) > Backdrop(60) > Navbar(50)
 */

// ============ LOCKED CONFIGURATION ============
const NAVBAR_CONFIG = {
  background: "#000000", // LOCKED: Always pure black
  menuButton: {
    size: 72, // pixels
    position: "-top-9",
    logoSize: "h-9 w-9",
  },
  icons: {
    size: "h-7 w-7",
    activeStroke: 2.5,
    inactiveStroke: 1.5,
  },
  spacing: {
    navPadding: "py-4",
    centerGap: "w-20",
  },
  zIndex: {
    navbar: 50,
    backdrop: 60,
    popup: 70,
    menuButton: 80,
  },
  fallbackColors: {
    inactive: "0 0% 60%",
    active: "25 95% 53%",
  },
} as const;

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

const MobileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setThemeUpdate] = useState(0);

  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = location.pathname === "/menu";

  // Read theme colors from CSS variables with fallbacks
  const getComputedColor = useCallback((varName: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return value || fallback;
  }, []);

  // Listen for theme changes from external theme store
  useEffect(() => {
    const handleThemeChange = () => setThemeUpdate((prev) => prev + 1);
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const inactiveHsl = getComputedColor("--colors-buttons-list", NAVBAR_CONFIG.fallbackColors.inactive);
  const activeHsl = getComputedColor("--colors-buttons-active", NAVBAR_CONFIG.fallbackColors.active);
  
  const inactiveColor = `hsl(${inactiveHsl})`;
  const activeColor = `hsl(${activeHsl})`;

  const getIconColor = (active: boolean) => active ? activeColor : inactiveColor;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-[${NAVBAR_CONFIG.zIndex.navbar}]`} style={{ zIndex: NAVBAR_CONFIG.zIndex.navbar }}>
      <div className="relative">
        <div className="relative flex items-end justify-center">
          {/* Main Navbar Bar - LOCKED BLACK BACKGROUND */}
          <div 
            className={`flex w-full items-center justify-evenly ${NAVBAR_CONFIG.spacing.navPadding}`}
            style={{ background: NAVBAR_CONFIG.background }}
          >
            {/* Left Navigation Items */}
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
                    className={`relative ${NAVBAR_CONFIG.icons.size} transition-all duration-300`}
                    style={{ color }}
                    strokeWidth={active ? NAVBAR_CONFIG.icons.activeStroke : NAVBAR_CONFIG.icons.inactiveStroke}
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

            {/* Center Spacer for Menu Button */}
            <div className={NAVBAR_CONFIG.spacing.centerGap} />

            {/* Right Navigation Items */}
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
                    className={`relative ${NAVBAR_CONFIG.icons.size} transition-all duration-300`}
                    style={{ color }}
                    strokeWidth={active ? NAVBAR_CONFIG.icons.activeStroke : NAVBAR_CONFIG.icons.inactiveStroke}
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

          {/* Floating Menu Button - LOCKED POSITION & SIZE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`absolute left-1/2 -translate-x-1/2 ${NAVBAR_CONFIG.menuButton.position} flex items-center justify-center active:scale-95 transition-transform duration-150`}
            style={{ zIndex: NAVBAR_CONFIG.zIndex.menuButton }}
          >
            <div
              className={`relative flex items-center justify-center rounded-full glow-pulse`}
              style={{
                width: NAVBAR_CONFIG.menuButton.size,
                height: NAVBAR_CONFIG.menuButton.size,
                background: NAVBAR_CONFIG.background,
                boxShadow: `0 0 15px 3px hsl(${activeHsl}), 0 0 30px 8px hsl(${activeHsl} / 0.5), 0 0 45px 12px hsl(${activeHsl} / 0.3)`,
              }}
            >
              <img src={nexusLogo} alt="Menu" className={NAVBAR_CONFIG.menuButton.logoSize} />
            </div>
          </button>

          {/* Menu Label - Aligned with other labels */}
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

      {/* Glow Animation Styles */}
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px hsl(${activeHsl} / 0.5)); }
          50% { filter: drop-shadow(0 0 15px hsl(${activeHsl} / 0.7)); }
        }
        .glow-pulse { animation: glow-pulse 3s infinite ease-in-out; }
      `}</style>
    </nav>
  );
};

export default MobileNavBar;
