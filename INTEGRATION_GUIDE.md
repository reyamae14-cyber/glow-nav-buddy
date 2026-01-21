# P-Stream Mobile Navigation Bar - Complete Integration Guide

> **⚠️ IMPORTANT: DO NOT MODIFY NAVBAR DIMENSIONS**  
> The navbar sizes, spacing, and layout are fully optimized for mobile displays.  
> Do not change: icon sizes (h-7 w-7, h-9 w-9), button sizes (w-[72px] h-[72px]), spacing (py-4, w-20), or positioning (-top-9, bottom-4).

---

## 🧠 For AI Assistants: How This Integration Works

### Theme Source
The 23 themes were extracted from the **p-stream** project repository:
- **Source**: `https://github.com/p-stream/p-stream`
- **Location in p-stream**: Theme definitions are stored in the theme store (typically `src/stores/theme/`)

### Architecture: Theme → Navbar Connection

The navbar does NOT import themes directly. Instead, it reads colors from **CSS variables** injected into the document root. This decouples the navbar from the theme store.

```
┌─────────────────────┐
│   Theme Store       │  (holds currentTheme object)
│   (useThemeStore)   │
└─────────┬───────────┘
          │ useEffect: when theme changes
          ▼
┌─────────────────────────────────────────┐
│   document.documentElement.style        │
│   (CSS Variables on :root)              │
│                                         │
│   --colors-buttons-list: "0 0% 60%"     │
│   --colors-buttons-active: "210 100% 50%"│
│   --colors-background-main: "0 0% 8%"   │
│   --colors-type-text: "0 0% 95%"        │
└─────────┬───────────────────────────────┘
          │ window.dispatchEvent("theme-change")
          ▼
┌─────────────────────┐
│   MobileNavBar      │  (listens for "theme-change" event)
│   & MenuPopup       │  (reads CSS vars via getComputedStyle)
└─────────────────────┘
```

### Step-by-Step: Making Themes Work

**Step 1: Store themes in your theme store**

```typescript
// src/stores/theme/index.ts (or useThemeStore.ts)
import { create } from 'zustand';

interface Theme {
  name: string;
  buttons: { list: string; active: string };
  background: { main: string };
}

interface ThemeStore {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeName: string) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  themes: [
    // All 23 themes go here (see theme list below)
    { name: "Blue", buttons: { list: "0 0% 60%", active: "210 100% 50%" }, background: { main: "0 0% 8%" } },
    // ... rest of themes
  ],
  currentTheme: { name: "Blue", buttons: { list: "0 0% 60%", active: "210 100% 50%" }, background: { main: "0 0% 8%" } },
  setTheme: (themeName) => {
    const theme = get().themes.find(t => t.name === themeName);
    if (theme) set({ currentTheme: theme });
  },
}));
```

**Step 2: Create a ThemeProvider that injects CSS variables**

```typescript
// src/providers/ThemeProvider.tsx
import { useEffect } from 'react';
import { useThemeStore } from '@/stores/theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const currentTheme = useThemeStore((state) => state.currentTheme);

  useEffect(() => {
    const root = document.documentElement;
    
    // Inject theme colors as CSS variables (HSL values WITHOUT hsl() wrapper)
    root.style.setProperty("--colors-buttons-list", currentTheme.buttons.list);
    root.style.setProperty("--colors-buttons-active", currentTheme.buttons.active);
    root.style.setProperty("--colors-background-main", currentTheme.background.main);
    root.style.setProperty("--colors-type-text", "0 0% 95%"); // Default text color
    
    // CRITICAL: Dispatch event so navbar re-reads colors
    window.dispatchEvent(new Event("theme-change"));
  }, [currentTheme]);

  return <>{children}</>;
};
```

**Step 3: Wrap your app with ThemeProvider**

```typescript
// src/App.tsx
import { ThemeProvider } from '@/providers/ThemeProvider';
import MobileNavBar from '@/components/MobileNavBar';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen pb-24">
        {/* Your routes/content */}
        <MobileNavBar />
      </div>
    </ThemeProvider>
  );
}
```

**Step 4: Navbar reads colors via getComputedStyle**

The navbar uses this pattern to read theme colors:

```typescript
// Inside MobileNavBar.tsx
const getComputedColor = useCallback((varName: string, fallback: string) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return value || fallback;
}, []);

// Listen for theme changes
useEffect(() => {
  const handleThemeChange = () => setThemeUpdate(prev => prev + 1);
  window.addEventListener("theme-change", handleThemeChange);
  return () => window.removeEventListener("theme-change", handleThemeChange);
}, []);

// Use colors (wrapping HSL values with hsl())
const inactiveColor = `hsl(${getComputedColor("--colors-buttons-list", "0 0% 60%")})`;
const activeColor = `hsl(${getComputedColor("--colors-buttons-active", "25 95% 53%")})`;
```

### Why This Pattern?

1. **Decoupling**: Navbar doesn't need to import theme store
2. **Performance**: CSS variables are native browser feature
3. **Flexibility**: Any component can read theme colors
4. **Event-driven**: Components react to changes instantly

---

## 📁 Required Files

Copy these files to your project:

1. `src/components/MobileNavBar.tsx` - Main navigation bar
2. `src/components/MenuPopup.tsx` - Floating menu popup
3. `src/components/ThemeTester.tsx` - Theme selector component (optional, for testing)
4. `src/assets/nexus-logo.svg` - Menu button logo

---

## 🎨 Available Themes (23 Total)

Place the themes in your theme store or use the `ThemeTester` component. All colors are in HSL format.

### Theme Definitions

```typescript
interface Theme {
  name: string;
  buttons: { list: string; active: string };
  background: { main: string };
}

const themes: Theme[] = [
  // Primary colors
  { name: "Blue", buttons: { list: "0 0% 60%", active: "210 100% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Red", buttons: { list: "0 0% 60%", active: "0 70% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Green", buttons: { list: "0 0% 60%", active: "150 40% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Orange", buttons: { list: "0 0% 60%", active: "30 100% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Purple", buttons: { list: "0 0% 60%", active: "270 40% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Pink", buttons: { list: "0 0% 60%", active: "330 60% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Cyan", buttons: { list: "0 0% 60%", active: "180 100% 45%" }, background: { main: "0 0% 8%" } },
  { name: "Gold", buttons: { list: "0 0% 60%", active: "45 80% 50%" }, background: { main: "0 0% 8%" } },
  
  // Metallic themes
  { name: "Silver", buttons: { list: "0 0% 60%", active: "210 10% 75%" }, background: { main: "0 0% 8%" } },
  { name: "Iron", buttons: { list: "0 0% 60%", active: "210 5% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Bronze", buttons: { list: "0 0% 60%", active: "30 50% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Copper", buttons: { list: "0 0% 60%", active: "20 70% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Platinum", buttons: { list: "0 0% 60%", active: "240 10% 75%" }, background: { main: "0 0% 8%" } },
  { name: "Titanium", buttons: { list: "0 0% 60%", active: "210 5% 75%" }, background: { main: "0 0% 8%" } },
  { name: "Zinc", buttons: { list: "0 0% 60%", active: "200 20% 75%" }, background: { main: "0 0% 8%" } },
  { name: "Lead", buttons: { list: "0 0% 60%", active: "220 10% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Sulfur", buttons: { list: "0 0% 60%", active: "40 80% 50%" }, background: { main: "0 0% 8%" } },
  
  // Neutral themes
  { name: "Noir", buttons: { list: "0 0% 60%", active: "0 0% 95%" }, background: { main: "0 0% 5%" } },
  { name: "Grey", buttons: { list: "0 0% 60%", active: "220 10% 65%" }, background: { main: "0 0% 8%" } },
  { name: "Dark", buttons: { list: "0 0% 60%", active: "220 10% 50%" }, background: { main: "0 0% 5%" } },
  { name: "Light", buttons: { list: "0 0% 40%", active: "270 40% 50%" }, background: { main: "0 0% 95%" } },
  
  // Special themes
  { name: "Christmas", buttons: { list: "0 0% 60%", active: "0 70% 50%" }, background: { main: "150 40% 8%" } },
  { name: "Spiderman", buttons: { list: "0 0% 60%", active: "0 70% 50%" }, background: { main: "210 100% 8%" } },
];
```

### Theme Categories

| Category | Themes |
|----------|--------|
| **Primary** | Blue, Red, Green, Orange, Purple, Pink, Cyan, Gold |
| **Metallic** | Silver, Iron, Bronze, Copper, Platinum, Titanium, Zinc, Lead, Sulfur |
| **Neutral** | Noir, Grey, Dark, Light |
| **Special** | Christmas, Spiderman |

### Applying a Theme

```typescript
const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.style.setProperty("--colors-buttons-list", theme.buttons.list);
  root.style.setProperty("--colors-buttons-active", theme.buttons.active);
  root.style.setProperty("--colors-background-main", theme.background.main);
  
  // Notify navbar of theme change
  window.dispatchEvent(new Event("theme-change"));
};
```

---

## 📦 Dependencies

```bash
npm install react-router-dom lucide-react
```

---

## 🎨 Theme Integration

The navbar reads colors from CSS variables on `document.documentElement`. Your theme store must inject these variables.

### Required CSS Variables (HSL format WITHOUT `hsl()` wrapper)

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| `--colors-buttons-list` | Inactive icon/text color | `0 0% 60%` |
| `--colors-buttons-active` | Active icon/text + glow | `25 95% 53%` |
| `--colors-background-main` | Navbar background | `0 0% 8%` |
| `--colors-type-text` | Menu popup text | `0 0% 95%` |

### Add to Your Theme Store (useThemeStore.ts)

```typescript
import { useEffect } from 'react';

// Inside your theme store or provider:
useEffect(() => {
  const theme = currentTheme; // Your active theme object
  const root = document.documentElement;
  
  // Inject CSS variables for navbar
  root.style.setProperty("--colors-buttons-list", theme.buttons?.list || "0 0% 60%");
  root.style.setProperty("--colors-buttons-active", theme.buttons?.active || "25 95% 53%");
  root.style.setProperty("--colors-background-main", theme.background?.main || "0 0% 8%");
  root.style.setProperty("--colors-type-text", theme.type?.text || "0 0% 95%");
  
  // Dispatch event to notify navbar of theme change
  window.dispatchEvent(new Event("theme-change"));
}, [currentTheme]);
```

---

## 📋 Complete Component Code

### MobileNavBar.tsx

```tsx
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
 * 
 * OPTIMIZED DIMENSIONS - DO NOT CHANGE:
 * - Icons: h-7 w-7 (28px)
 * - Menu logo: h-9 w-9 (36px)
 * - Menu button: w-[72px] h-[72px]
 * - Menu button position: -top-9 (half in/half out of navbar)
 * - Navbar padding: py-4
 * - Center spacer: w-20
 * - Label position: bottom-4
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

  // Listen for theme changes from theme store
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

          {/* Center Menu button - floating circle (half in/half out) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="absolute left-1/2 -translate-x-1/2 -top-9 flex items-center justify-center active:scale-95 transition-transform duration-150"
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
```

### MenuPopup.tsx

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

/**
 * MenuPopup Component for p-stream
 * 
 * Required CSS variables:
 * - --colors-background-main: Dark background
 * - --colors-buttons-active: Accent color for header bar
 * - --colors-type-text: Text color
 */
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

## 🎭 Required CSS (Add to your global CSS)

```css
/* Glow pulse animation for menu button */
.glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.1);
  }
}

/* Tailwind animate-in classes (if not using tailwindcss-animate) */
.animate-in {
  animation-duration: 200ms;
  animation-fill-mode: both;
}

.fade-in {
  animation-name: fadeIn;
}

.slide-in-from-bottom-4 {
  animation-name: slideInFromBottom;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInFromBottom {
  from { transform: translate(-50%, 1rem); }
  to { transform: translate(-50%, 0); }
}
```

---

## 🔧 Usage in Your App

```tsx
import MobileNavBar from "@/components/MobileNavBar";

const App = () => {
  return (
    <div className="min-h-screen pb-24"> {/* pb-24 for navbar space */}
      {/* Your page content */}
      <MobileNavBar />
    </div>
  );
};
```

---

## 📐 Layout Specifications (DO NOT MODIFY)

| Element | Size | Notes |
|---------|------|-------|
| Nav icons | `h-7 w-7` (28px) | Home, Search, Recent, Profile |
| Menu logo | `h-9 w-9` (36px) | Center button icon |
| Menu button circle | `w-[72px] h-[72px]` | Floating circle |
| Menu button position | `-top-9` | Half inside, half outside navbar |
| Menu label position | `bottom-4` | Aligned with other labels |
| Center spacer | `w-20` | Space for floating button |
| Navbar padding | `py-4` | Vertical padding |
| Icon distribution | `justify-evenly` | Edge-to-edge layout |
| Active stroke width | `2.5` | Thicker when active |
| Inactive stroke width | `1.5` | Default stroke |

---

## 🎨 Theme Color Flow

```
┌─────────────────┐     useEffect      ┌──────────────────────┐
│   Theme Store   │ ──────────────────▶│  CSS Variables on    │
│  (currentTheme) │                    │  document.documentElement │
└─────────────────┘                    └──────────────────────┘
                                                  │
                                                  │ getComputedStyle
                                                  ▼
                                       ┌──────────────────────┐
                                       │    MobileNavBar      │
                                       │    (reads colors)    │
                                       └──────────────────────┘
```

---

## ✅ Checklist for Integration

- [ ] Copy `MobileNavBar.tsx` to `src/components/`
- [ ] Copy `MenuPopup.tsx` to `src/components/`
- [ ] Copy `nexus-logo.svg` to `src/assets/`
- [ ] Add CSS variables injection to your theme store
- [ ] Dispatch `theme-change` event when theme changes
- [ ] Add `pb-24` padding to your page containers
- [ ] Add glow-pulse animation to your global CSS
- [ ] **DO NOT MODIFY** any dimension values

---

## 🚫 What NOT to Change

1. **Icon sizes** - `h-7 w-7` for nav icons, `h-9 w-9` for menu logo
2. **Menu button size** - `w-[72px] h-[72px]`
3. **Positioning** - `-top-9`, `bottom-4`, `left-1/2`
4. **Spacing** - `py-4`, `w-20`, `gap-1`, `gap-3`
5. **Layout** - `justify-evenly`, `flex-col`
6. **Z-index** - `z-50` for navbar, `z-40/z-50` for popup

These values are optimized for mobile displays and edge-to-edge rendering.
