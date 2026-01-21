import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import nexusLogo from "@/assets/nexus-logo.svg";
import { cn } from "@/lib/utils";
import type { ThemeColors } from "./ThemeTester";

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

interface MobileNavBarProps {
  theme?: ThemeColors;
}

const MobileNavBar = ({ theme }: MobileNavBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = location.pathname === "/menu";

  // Get colors from theme or use defaults
  const activeColor = theme?.buttons.active || "25 95% 53%";
  const inactiveColor = theme?.buttons.list || "0 0% 95%";
  const glowColor = theme?.buttons.active || "25 95% 53%";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="relative mx-auto max-w-md">
        {/* Main nav bar container */}
        <div className="relative flex items-end justify-center">
          {/* Dark rounded bar */}
          <div className="flex w-full items-center justify-around rounded-[2rem] bg-[hsl(var(--nav-background))] px-6 py-4">
            {/* Left side buttons */}
            {navItems.slice(0, 2).map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center gap-1 active:scale-90 transition-transform duration-150"
                >
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active ? "glow-orange" : ""
                    )}
                    style={{
                      color: active ? `hsl(${activeColor})` : `hsl(${inactiveColor})`,
                      filter: active 
                        ? `drop-shadow(0 0 8px hsl(${glowColor} / 0.6)) drop-shadow(0 0 20px hsl(${glowColor} / 0.3))`
                        : undefined
                    }}
                    strokeWidth={active ? 2.5 : 1.5}
                  />
                  
                  <span
                    className="text-sm font-medium transition-colors duration-300"
                    style={{
                      color: active ? `hsl(${activeColor})` : `hsl(${inactiveColor})`
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Glowing dot below text */}
                  {active && (
                    <div 
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                      style={{
                        background: `hsl(${glowColor})`,
                        boxShadow: `0 0 6px 2px hsl(${glowColor}), 0 0 12px 4px hsl(${glowColor} / 0.6)`,
                      }}
                    />
                  )}
                </button>
              );
            })}

            {/* Center Menu button - spacer */}
            <div className="w-20" />

            {/* Right side buttons */}
            {navItems.slice(2).map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center gap-1 active:scale-90 transition-transform duration-150"
                >
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active ? "glow-orange" : ""
                    )}
                    style={{
                      color: active ? `hsl(${activeColor})` : `hsl(${inactiveColor})`,
                      filter: active 
                        ? `drop-shadow(0 0 8px hsl(${glowColor} / 0.6)) drop-shadow(0 0 20px hsl(${glowColor} / 0.3))`
                        : undefined
                    }}
                    strokeWidth={active ? 2.5 : 1.5}
                  />
                  
                  <span
                    className="text-sm font-medium transition-colors duration-300"
                    style={{
                      color: active ? `hsl(${activeColor})` : `hsl(${inactiveColor})`
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Glowing dot below text */}
                  {active && (
                    <div 
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                      style={{
                        background: `hsl(${glowColor})`,
                        boxShadow: `0 0 6px 2px hsl(${glowColor}), 0 0 12px 4px hsl(${glowColor} / 0.6)`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Center Menu button - circle floats above, text aligns with others */}
          <button
            onClick={() => navigate("/menu")}
            className="absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col items-center active:scale-95 transition-transform duration-150"
          >
            {/* Black circle with orange glow - positioned above */}
            <div 
              className="relative flex items-center justify-center w-14 h-14 rounded-full glow-pulse -mt-10"
              style={{
                background: `hsl(var(--nav-background))`,
                boxShadow: `0 0 15px 3px hsl(${glowColor}), 0 0 30px 8px hsl(${glowColor} / 0.5), 0 0 45px 12px hsl(${glowColor} / 0.3)`,
              }}
            >
              {/* Logo centered inside - glows when active like other icons */}
              <img 
                src={nexusLogo}
                alt="Menu"
                className="h-7 w-7 transition-all duration-300"
                style={{
                  filter: isMenuActive 
                    ? `drop-shadow(0 0 8px hsl(${glowColor} / 0.6)) drop-shadow(0 0 20px hsl(${glowColor} / 0.3))`
                    : undefined
                }}
              />
            </div>
            
            <span
              className="text-sm font-medium transition-colors duration-300 mt-1"
              style={{
                color: isMenuActive ? `hsl(${activeColor})` : `hsl(${inactiveColor})`
              }}
            >
              Menu
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavBar;
