# MobileNavBar Integration Guide for p-stream

## 🤖 AI INSTRUCTIONS

**IMPORTANT: This guide contains all files and instructions needed to integrate the navigation components into the p-stream project. Copy each file exactly as shown.**

---

## 📁 FILE 1: MobileNavBar.tsx

**Path:** `src/components/MobileNavBar.tsx`

```tsx
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
 * Reads theme colors from CSS variables injected by p-stream's theme store.
 * 
 * Required CSS variables:
 * - --colors-buttons-list: Inactive icon/text color (gray)
 * - --colors-buttons-active: Active icon/text color (theme primary)
 * - --colors-background-main: Dark background color
 */
const MobileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = location.pathname === "/menu";

  const getComputedColor = (varName: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return value || fallback;
  };

  const inactiveHsl = getComputedColor("--colors-buttons-list", "0 0% 60%");
  const activeHsl = getComputedColor("--colors-buttons-active", "25 95% 53%");
  
  const inactiveColor = `hsl(${inactiveHsl})`;
  const activeColor = `hsl(${activeHsl})`;
  const menuGlowColor = activeHsl;

  const getIconColor = (active: boolean) => active ? activeColor : inactiveColor;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="relative mx-auto max-w-md">
        <div className="relative flex items-end justify-center">
          <div 
            className="flex w-full items-center justify-around px-6 py-4"
            style={{
              background: `hsl(var(--colors-background-main, 0 0% 8%))`,
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

            {/* Center Menu button spacer */}
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
      
      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
};

export default MobileNavBar;
```

---

## 📁 FILE 2: MenuPopup.tsx

**Path:** `src/components/MenuPopup.tsx`

```tsx
import { useNavigate } from "react-router-dom";

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "movies", label: "Movies", path: "/movies", emoji: "🎬" },
  { id: "tvshows", label: "TV Shows", path: "/tv", emoji: "📺" },
  { id: "anime", label: "Anime", path: "/anime", emoji: "✨" },
  { id: "discover", label: "Discover", path: "/discover", emoji: "🧭" },
  { id: "favorites", label: "Favorites", path: "/favorites", emoji: "❤️" },
  { id: "settings", label: "Settings", path: "/settings", emoji: "⚙️" },
];

const MenuPopup = ({ isOpen, onClose }: MenuPopupProps) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Menu Box */}
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 w-[280px] animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div 
          className="rounded-2xl p-4 shadow-xl border border-white/10"
          style={{ background: `hsl(var(--colors-background-main, 0 0% 8%))` }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <div 
              className="w-1 h-5 rounded-full"
              style={{ background: `hsl(var(--colors-buttons-active, 25 95% 53%))` }}
            />
            <h3 
              className="text-lg font-semibold"
              style={{ color: `hsl(var(--colors-type-text, 0 0% 95%))` }}
            >
              Browse
            </h3>
          </div>
          
          {/* Menu Grid */}
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 active:scale-95"
              >
                <span className="text-xl">{item.emoji}</span>
                <span 
                  className="text-sm font-medium"
                  style={{ color: `hsl(var(--colors-type-text, 0 0% 95%))` }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPopup;
```

---

## 📁 FILE 3: NavLink.tsx

**Path:** `src/components/NavLink.tsx`

```tsx
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
```

---

## 📁 FILE 4: nexus-logo.svg

**Path:** `src/assets/nexus-logo.svg`

Copy the SVG file directly from the source project.

---

## 🎨 CSS TO ADD

**Add to your global CSS file (e.g., `src/index.css`):**

```css
/* Glow animation for the center menu button */
@keyframes glow-pulse {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}
```

---

## 🔌 THEME STORE INTEGRATION

**Add this to your theme store/provider to inject CSS variables:**

```typescript
// In your theme store useEffect or subscription
useEffect(() => {
  const theme = currentTheme; // Your active theme object
  
  // Inject navbar-required CSS variables
  document.documentElement.style.setProperty(
    "--colors-buttons-list", 
    theme.buttons?.list || "0 0% 60%"
  );
  document.documentElement.style.setProperty(
    "--colors-buttons-active", 
    theme.buttons?.active || "25 95% 53%"
  );
  document.documentElement.style.setProperty(
    "--colors-background-main", 
    theme.background?.main || "0 0% 8%"
  );
  document.documentElement.style.setProperty(
    "--colors-type-text", 
    theme.type?.text || "0 0% 95%"
  );
}, [currentTheme]);
```

---

## 📍 LAYOUT USAGE

**Add MobileNavBar to your layout or pages:**

```tsx
import MobileNavBar from "@/components/MobileNavBar";

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide navbar on these routes
  const hideNavRoutes = ["/settings", "/onboarding", "/login"];
  const showNav = !hideNavRoutes.some(r => location.pathname.startsWith(r));
  
  return (
    <div className="min-h-screen pb-24">
      {children}
      {showNav && <MobileNavBar />}
    </div>
  );
};
```

---

## ✅ INTEGRATION CHECKLIST

- [ ] Create `src/components/MobileNavBar.tsx` with code from FILE 1
- [ ] Create `src/components/MenuPopup.tsx` with code from FILE 2
- [ ] Create `src/components/NavLink.tsx` with code from FILE 3
- [ ] Copy `nexus-logo.svg` to `src/assets/`
- [ ] Add `.glow-pulse` CSS animation to global styles
- [ ] Add CSS variable injection to theme store
- [ ] Add `<MobileNavBar />` to layout with route-based hiding
- [ ] Update MenuPopup paths to match your actual routes
- [ ] Add `pb-24` padding to page containers for navbar space

---

## 🧪 TESTING

1. **Theme switching**: Change themes → navbar colors should update
2. **Navigation**: Tap nav buttons → active state changes color
3. **Menu popup**: Tap center button → popup slides up
4. **Route hiding**: Go to `/settings` → navbar hides

---

## 📦 DEPENDENCIES

Ensure these are installed:
- `react-router-dom`
- `lucide-react`

---

## 🎯 NAVBAR SHAPE SPEC

The navbar uses a custom border-radius (flat top, rounded bottom):
```css
border-radius: 12px 12px 32px 32px;
```
