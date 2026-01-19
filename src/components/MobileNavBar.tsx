import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "search", label: "Search", icon: Search, path: "/search" },
  { id: "menu", label: "Menu", icon: () => null, path: "/menu" },
  { id: "recent", label: "Recent", icon: History, path: "/recent" },
  { id: "profile", label: "Profile", icon: User, path: "/profile" },
];

const MobileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:hidden">
      <div className="relative mx-auto max-w-md">
        {/* Main nav bar */}
        <div className="relative flex items-center justify-around rounded-[2rem] bg-[hsl(var(--nav-background))] px-4 py-3">
          {navItems.map((item) => {
            const active = isActive(item.path);
            
            // Center menu button with logo
            if (item.id === "menu") {
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative -mt-8 flex flex-col items-center"
                >
                  {/* Glow effect behind logo */}
                  <div
                    className={cn(
                      "absolute inset-0 -top-2 rounded-full blur-xl transition-opacity duration-300",
                      active ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      background: `radial-gradient(circle, hsl(var(--nav-glow) / 0.8) 0%, transparent 70%)`,
                      width: "80px",
                      height: "80px",
                      transform: "translate(-50%, -20%)",
                      left: "50%",
                    }}
                  />
                  
                  {/* Logo container */}
                  <div
                    className={cn(
                      "relative flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-300",
                      active
                        ? "border-primary glow-pulse"
                        : "border-[hsl(var(--nav-foreground)/0.3)]"
                    )}
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--nav-background)) 0%, hsl(0 0% 12%) 100%)`,
                    }}
                  >
                    <img
                      src={logo}
                      alt="Menu"
                      className={cn(
                        "h-8 w-8 transition-all duration-300",
                        active ? "glow-orange" : "opacity-70"
                      )}
                    />
                  </div>
                  
                  <span
                    className={cn(
                      "mt-1 text-xs font-medium transition-colors duration-300",
                      active
                        ? "text-primary"
                        : "text-[hsl(var(--nav-foreground)/0.7)]"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );
            }

            // Regular nav items
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-1 px-3 py-1"
              >
                {/* Glow effect */}
                {active && (
                  <div
                    className="absolute -top-1 h-8 w-8 rounded-full blur-md glow-pulse"
                    style={{
                      background: `radial-gradient(circle, hsl(var(--nav-glow) / 0.6) 0%, transparent 70%)`,
                    }}
                  />
                )}
                
                <Icon
                  className={cn(
                    "relative h-6 w-6 transition-all duration-300",
                    active
                      ? "text-primary glow-orange"
                      : "text-[hsl(var(--nav-foreground)/0.7)]"
                  )}
                />
                
                <span
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    active
                      ? "text-primary"
                      : "text-[hsl(var(--nav-foreground)/0.7)]"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileNavBar;
