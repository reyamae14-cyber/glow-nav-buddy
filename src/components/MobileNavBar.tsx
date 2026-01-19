import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import logo from "@/assets/logo.svg";
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
                  className="relative flex flex-col items-center gap-1.5"
                >
                  {/* Glow effect */}
                  {active && (
                    <div
                      className="absolute -top-2 h-10 w-10 rounded-full glow-pulse"
                      style={{
                        background: `radial-gradient(circle, hsl(var(--nav-glow) / 0.5) 0%, transparent 70%)`,
                      }}
                    />
                  )}
                  
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active
                        ? "text-primary glow-orange fill-primary"
                        : "text-[hsl(var(--nav-foreground))]"
                    )}
                    strokeWidth={active ? 2 : 1.5}
                    fill={active ? "currentColor" : "none"}
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
                  className="relative flex flex-col items-center gap-1.5"
                >
                  {/* Glow effect */}
                  {active && (
                    <div
                      className="absolute -top-2 h-10 w-10 rounded-full glow-pulse"
                      style={{
                        background: `radial-gradient(circle, hsl(var(--nav-glow) / 0.5) 0%, transparent 70%)`,
                      }}
                    />
                  )}
                  
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active
                        ? "text-primary glow-orange fill-primary"
                        : "text-[hsl(var(--nav-foreground))]"
                    )}
                    strokeWidth={active ? 2 : 1.5}
                    fill={active ? "currentColor" : "none"}
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
                </button>
              );
            })}
          </div>

          {/* Center Menu button - floating above the bar */}
          <button
            onClick={() => navigate("/menu")}
            className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center"
          >
            {/* Orange glow behind */}
            <div
              className={cn(
                "absolute rounded-full transition-opacity duration-300 glow-pulse",
                isMenuActive ? "opacity-100" : "opacity-70"
              )}
              style={{
                background: `radial-gradient(circle, hsl(var(--nav-glow) / 0.8) 0%, hsl(var(--nav-glow) / 0.4) 40%, transparent 70%)`,
                width: "100px",
                height: "100px",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
            
            {/* Logo circle */}
            <div
              className={cn(
                "relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] transition-all duration-300",
                isMenuActive
                  ? "border-primary"
                  : "border-primary/80"
              )}
              style={{
                background: "linear-gradient(180deg, hsl(0 0% 15%) 0%, hsl(0 0% 8%) 100%)",
                boxShadow: `0 0 30px hsl(var(--nav-glow) / 0.6), inset 0 0 20px hsl(0 0% 0% / 0.3)`,
              }}
            >
              <img
                src={logo}
                alt="Menu"
                className="h-9 w-9 glow-orange"
                style={{
                  filter: `drop-shadow(0 0 8px hsl(var(--nav-glow))) drop-shadow(0 0 20px hsl(var(--nav-glow) / 0.5))`,
                }}
              />
            </div>
            
            <span
              className={cn(
                "mt-1 text-sm font-medium transition-colors duration-300",
                isMenuActive
                  ? "text-primary"
                  : "text-[hsl(var(--nav-foreground))]"
              )}
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
