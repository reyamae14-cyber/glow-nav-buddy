import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import logo from "@/assets/menu-logo.png";
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
                  className="relative flex flex-col items-center gap-1.5 active:scale-90 transition-transform duration-150"
                >
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active
                        ? "text-primary"
                        : "text-[hsl(var(--nav-foreground))]"
                    )}
                    strokeWidth={active ? 2.5 : 1.5}
                    style={active ? {
                      filter: `drop-shadow(0 0 8px hsl(var(--nav-glow))) drop-shadow(0 0 16px hsl(var(--nav-glow) / 0.6))`,
                    } : undefined}
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
                  className="relative flex flex-col items-center gap-1.5 active:scale-90 transition-transform duration-150"
                >
                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active
                        ? "text-primary"
                        : "text-[hsl(var(--nav-foreground))]"
                    )}
                    strokeWidth={active ? 2.5 : 1.5}
                    style={active ? {
                      filter: `drop-shadow(0 0 8px hsl(var(--nav-glow))) drop-shadow(0 0 16px hsl(var(--nav-glow) / 0.6))`,
                    } : undefined}
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
            className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center active:scale-95 transition-transform duration-150"
          >
            {/* Orange glow behind - single glow */}
            <div
              className="absolute rounded-full glow-pulse"
              style={{
                background: `radial-gradient(circle, hsl(var(--nav-glow) / 0.7) 0%, hsl(var(--nav-glow) / 0.3) 50%, transparent 70%)`,
                width: "120px",
                height: "120px",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
            
            {/* Logo circle */}
            <div
              className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] border-primary overflow-hidden"
              style={{
                background: "linear-gradient(180deg, hsl(0 0% 12%) 0%, hsl(0 0% 5%) 100%)",
                boxShadow: `0 0 25px hsl(var(--nav-glow) / 0.5)`,
              }}
            >
              <img
                src={logo}
                alt="Menu"
                className="h-10 w-10 object-contain"
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
