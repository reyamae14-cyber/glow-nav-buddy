import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import nexusLogo from "@/assets/nexus-logo.svg";
import { cn } from "@/lib/utils";
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

const MobileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = location.pathname === "/menu";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="relative mx-auto max-w-md">
        <div className="relative flex items-end justify-center">
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
                      active ? "text-primary glow-orange" : "text-[hsl(var(--nav-foreground))]",
                    )}
                    strokeWidth={active ? 2.5 : 1.5}
                  />

                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      active ? "text-primary" : "text-[hsl(var(--nav-foreground))]",
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
                  className="relative flex flex-col items-center gap-1 active:scale-90 transition-transform duration-150"
                >

                  <Icon
                    className={cn(
                      "relative h-7 w-7 transition-all duration-300",
                      active ? "text-primary glow-orange" : "text-[hsl(var(--nav-foreground))]",
                    )}
                    strokeWidth={active ? 2.5 : 1.5}
                  />

                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      active ? "text-primary" : "text-[hsl(var(--nav-foreground))]",
                    )}
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
