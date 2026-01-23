# P-STREAM Mobile Navigation - Complete Integration Guide

> **⚠️ LOCKED SPECIFICATIONS - DO NOT MODIFY**  
> All dimensions, colors, and positions are optimized and locked.

---

## 🤖 AI AGENT QUICK INTEGRATION

### Step 1: Copy Files
```
src/components/MobileNavBar.tsx
src/components/MenuPopup.tsx  
src/assets/nexus-logo.svg
```

### Step 2: Add to Layout
```tsx
import MobileNavBar from "@/components/MobileNavBar";

function App() {
  return (
    <div className="min-h-screen pb-24">
      {/* Your content */}
      <MobileNavBar />
    </div>
  );
}
```

### Step 3: Connect Theme (Optional)
```typescript
useEffect(() => {
  const root = document.documentElement;
  root.style.setProperty("--colors-buttons-list", "0 0% 60%");
  root.style.setProperty("--colors-buttons-active", "25 95% 53%");
  root.style.setProperty("--colors-type-text", "0 0% 95%");
  window.dispatchEvent(new Event("theme-change"));
}, [theme]);
```

---

## 🔒 LOCKED CONFIGURATION

### Navbar
| Property | Value | Notes |
|----------|-------|-------|
| Background | `#000000` | Pure black, always |
| Z-Index | `50` | Base layer |
| Padding | `py-4` | Vertical padding |
| Layout | `justify-evenly` | Edge-to-edge distribution |

### Menu Button
| Property | Value | Notes |
|----------|-------|-------|
| Size | `72×72px` | Fixed circle |
| Position | `-top-9` | Floats above navbar |
| Logo Size | `h-9 w-9` | 36px |
| Z-Index | `80` | Always on top |

### Navigation Icons
| Property | Value |
|----------|-------|
| Size | `h-7 w-7` (28px) |
| Active Stroke | `2.5` |
| Inactive Stroke | `1.5` |

### Z-Index Hierarchy
```
Menu Button: 80 (always clickable)
Popup Box:   70
Backdrop:    60
Navbar:      50
```

---

## 🎨 THEME VARIABLES

| Variable | Purpose | Default |
|----------|---------|---------|
| `--colors-buttons-list` | Inactive color | `0 0% 60%` |
| `--colors-buttons-active` | Active/glow color | `25 95% 53%` |
| `--colors-type-text` | Popup text | `0 0% 95%` |

### Pre-Built Theme Colors
```typescript
const themeColors = {
  orange: "25 95% 53%",
  red: "0 84% 60%",
  blue: "217 91% 60%",
  green: "142 76% 36%",
  purple: "280 73% 58%",
  pink: "350 89% 60%",
  cyan: "187 100% 42%",
  yellow: "48 96% 53%",
  gold: "43 74% 49%",
  silver: "210 14% 66%",
};
```

---

## ✨ ANIMATIONS

### Menu Button - Glow Pulse
```css
@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 8px hsl(active / 0.5)); }
  50% { filter: drop-shadow(0 0 15px hsl(active / 0.7)); }
}
```

### Menu Popup
- **Open**: Scale up + slide in (400ms spring)
- **Close**: Scale down + slide out (300ms)
- **Items**: Staggered fade (50ms delay each)

---

## 📦 COMPLETE SOURCE CODE

### MobileNavBar.tsx

```tsx
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, User } from "lucide-react";
import nexusLogo from "@/assets/nexus-logo.svg";
import MenuPopup from "./MenuPopup";

/**
 * P-STREAM MOBILE NAVIGATION BAR
 * 
 * LOCKED SPECIFICATIONS - DO NOT MODIFY:
 * - Background: #000000 (pure black)
 * - Menu Button: 72x72px, -top-9
 * - Icons: h-7 w-7, Logo: h-9 w-9
 * - Z-Index: Button(80) > Popup(70) > Backdrop(60) > Navbar(50)
 */

const NAVBAR_CONFIG = {
  background: "#000000",
  menuButton: { size: 72, position: "-top-9", logoSize: "h-9 w-9" },
  icons: { size: "h-7 w-7", activeStroke: 2.5, inactiveStroke: 1.5 },
  spacing: { navPadding: "py-4", centerGap: "w-20" },
  zIndex: { navbar: 50, backdrop: 60, popup: 70, menuButton: 80 },
  fallbackColors: { inactive: "0 0% 60%", active: "25 95% 53%" },
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

  const getComputedColor = useCallback((varName: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return value || fallback;
  }, []);

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
    <nav className="fixed bottom-0 left-0 right-0" style={{ zIndex: NAVBAR_CONFIG.zIndex.navbar }}>
      <div className="relative">
        <div className="relative flex items-end justify-center">
          <div 
            className={`flex w-full items-center justify-evenly ${NAVBAR_CONFIG.spacing.navPadding}`}
            style={{ background: NAVBAR_CONFIG.background }}
          >
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
                  <span className="text-sm font-medium transition-colors duration-300" style={{ color }}>
                    {item.label}
                  </span>
                </button>
              );
            })}

            <div className={NAVBAR_CONFIG.spacing.centerGap} />

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
                  <span className="text-sm font-medium transition-colors duration-300" style={{ color }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`absolute left-1/2 -translate-x-1/2 ${NAVBAR_CONFIG.menuButton.position} flex items-center justify-center active:scale-95 transition-transform duration-150`}
            style={{ zIndex: NAVBAR_CONFIG.zIndex.menuButton }}
          >
            <div
              className="relative flex items-center justify-center rounded-full glow-pulse"
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
      
      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

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
```

### MenuPopup.tsx

```tsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * P-STREAM MENU POPUP
 * 
 * LOCKED SPECIFICATIONS - DO NOT MODIFY:
 * - Background: #000000 (pure black)
 * - Position: bottom-28, centered
 * - Width: 280px
 * - Z-Index: Popup(70), Backdrop(60)
 */

const POPUP_CONFIG = {
  background: "#000000",
  width: 280,
  position: "bottom-28",
  zIndex: { backdrop: 60, popup: 70 },
  animation: { duration: 300, closeDelay: 250, navigateDelay: 200 },
  fallbackColors: { active: "25 95% 53%", text: "0 0% 95%" },
} as const;

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
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const getComputedColor = useCallback((varName: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return value || fallback;
  }, []);

  const activeHsl = getComputedColor("--colors-buttons-active", POPUP_CONFIG.fallbackColors.active);
  const textHsl = getComputedColor("--colors-type-text", POPUP_CONFIG.fallbackColors.text);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    } else if (isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, POPUP_CONFIG.animation.duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, POPUP_CONFIG.animation.closeDelay);
  };

  const handleNavigate = (path: string) => {
    setIsClosing(true);
    setTimeout(() => {
      navigate(path);
      onClose();
    }, POPUP_CONFIG.animation.navigateDelay);
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        className="fixed inset-0 backdrop-blur-sm"
        style={{
          zIndex: POPUP_CONFIG.zIndex.backdrop,
          background: 'rgba(0, 0, 0, 0.7)',
          animation: isClosing ? 'fadeOut 0.3s ease-out forwards' : 'fadeIn 0.3s ease-out forwards',
        }}
        onClick={handleClose}
      />
      
      <div 
        className={`fixed ${POPUP_CONFIG.position} left-1/2`}
        style={{
          zIndex: POPUP_CONFIG.zIndex.popup,
          width: POPUP_CONFIG.width,
          animation: isClosing 
            ? 'menuSlideOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards'
            : 'menuSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <div 
          className="rounded-2xl p-4 shadow-2xl border border-white/10"
          style={{ 
            background: POPUP_CONFIG.background,
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px hsl(${activeHsl} / 0.15)`,
          }}
        >
          <div 
            className="flex items-center gap-2 mb-4 px-1"
            style={{ 
              animation: isClosing ? 'itemFadeOut 0.2s ease-out forwards' : 'itemFadeIn 0.3s ease-out 0.1s forwards', 
              opacity: isClosing ? 1 : 0 
            }}
          >
            <div className="w-1 h-5 rounded-full" style={{ background: `hsl(${activeHsl})` }} />
            <h3 className="text-lg font-semibold" style={{ color: `hsl(${textHsl})` }}>Browse</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 
                           hover:bg-white/15 transition-all duration-300 
                           hover:scale-[1.02] active:scale-95 hover:shadow-lg"
                style={{
                  animation: isClosing 
                    ? `itemFadeOut 0.2s ease-out ${(5 - index) * 0.03}s forwards`
                    : `itemFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + index * 0.05}s forwards`,
                  opacity: isClosing ? 1 : 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 20px hsl(${activeHsl} / 0.2)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-110">{item.emoji}</span>
                <span className="text-sm font-medium transition-colors duration-300" style={{ color: `hsl(${textHsl})` }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes menuSlideIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes menuSlideOut {
          from { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          to { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
        }
        @keyframes itemFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes itemFadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
};

export default MenuPopup;
```

---

## ✅ REQUIREMENTS

### Dependencies
```bash
npm install react-router-dom lucide-react
```

### Assets
- `src/assets/nexus-logo.svg`

---

## 🚀 PRODUCTION READY

- ✅ Permanent black background (locked)
- ✅ All dimensions locked in config
- ✅ Self-contained animations
- ✅ Theme integration via CSS variables
- ✅ Fallback colors included
- ✅ Error-free, optimized code
