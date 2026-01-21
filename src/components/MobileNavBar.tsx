import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import nexusLogo from "@/assets/nexus-logo.svg";
import { cn } from "@/lib/utils";

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

  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = location.pathname === "/menu";

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
                  {/* Fire glow effect at top */}
                  {active && (
                    <div 
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                      style={{
                        background: `radial-gradient(circle, hsl(var(--nav-glow)) 0%, hsl(var(--nav-glow) / 0.5) 40%, transparent 70%)`,
                        filter: `blur(2px)`,
                      }}
                    />
                  )}
                  
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active
                        ? "text-primary glow-orange"
                        : "text-[hsl(var(--nav-foreground))]"
                    )}
                    strokeWidth={active ? 2.5 : 1.5}
                    fill={active ? "hsl(var(--primary))" : "none"}
                  />
                  
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      active
                        ? "text-primary"
                        : "text-[hsl(var(--nav-foreground))]"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Dot glow indicator below text */}
                  {active && (
                    <div 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                      style={{
                        boxShadow: `0 0 6px 2px hsl(var(--nav-glow)), 0 0 10px 4px hsl(var(--nav-glow) / 0.5)`,
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
                  {/* Fire glow effect at top */}
                  {active && (
                    <div 
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                      style={{
                        background: `radial-gradient(circle, hsl(var(--nav-glow)) 0%, hsl(var(--nav-glow) / 0.5) 40%, transparent 70%)`,
                        filter: `blur(2px)`,
                      }}
                    />
                  )}
                  
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active
                        ? "text-primary glow-orange"
                        : "text-[hsl(var(--nav-foreground))]"
                    )}
                    strokeWidth={active ? 2.5 : 1.5}
                    fill={active ? "hsl(var(--primary))" : "none"}
                  />
                  
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      active
                        ? "text-primary"
                        : "text-[hsl(var(--nav-foreground))]"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Dot glow indicator below text */}
                  {active && (
                    <div 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                      style={{
                        boxShadow: `0 0 6px 2px hsl(var(--nav-glow)), 0 0 10px 4px hsl(var(--nav-glow) / 0.5)`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Center Menu button - floating above the bar */}
          <button
            onClick={() => navigate("/menu")}
            className="absolute left-1/2 -translate-x-1/2 bottom-3 flex flex-col items-center active:scale-95 transition-transform duration-150"
          >
            {/* Glow behind logo */}
            <div
              className="absolute rounded-full glow-pulse"
              style={{
                background: `radial-gradient(circle, hsl(var(--nav-glow) / 0.6) 0%, hsl(var(--nav-glow) / 0.2) 50%, transparent 70%)`,
                width: "60px",
                height: "60px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            
            {/* Logo - same size as other icons */}
            <div className="relative flex items-center justify-center h-7 w-7">
              <img 
                src={nexusLogo}
                alt="Menu"
                className="h-7 w-7"
                style={{
                  filter: `drop-shadow(0 0 8px hsl(var(--nav-glow))) drop-shadow(0 0 16px hsl(var(--nav-glow) / 0.6))`,
                }}
              />
            </div>
            
            <span
              className={cn(
                "text-sm font-medium transition-colors duration-300 mt-1",
                isMenuActive
                  ? "text-primary"
                  : "text-[hsl(var(--nav-foreground))]"
              )}
            >
              Menu
            </span>

            {/* Dot glow indicator below text */}
            {isMenuActive && (
              <div 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                style={{
                  boxShadow: `0 0 6px 2px hsl(var(--nav-glow)), 0 0 10px 4px hsl(var(--nav-glow) / 0.5)`,
                }}
              />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavBar;
