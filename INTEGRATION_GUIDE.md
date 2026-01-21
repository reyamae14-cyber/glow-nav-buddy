# MobileNavBar Integration Guide for p-stream

## AI Integration Instructions

This guide is for AI assistants integrating the MobileNavBar into the p-stream project.

---

## Files to Copy

Copy these files from this project to p-stream:

| Source File | Destination |
|------------|-------------|
| `src/components/MobileNavBar.tsx` | `src/components/MobileNavBar.tsx` |
| `src/components/MenuPopup.tsx` | `src/components/MenuPopup.tsx` |
| `src/assets/nexus-logo.svg` | `src/assets/nexus-logo.svg` |

---

## Theme Integration

The MobileNavBar reads theme colors from CSS variables. It expects p-stream's theme store to inject these variables into the document root.

### Required CSS Variables

The navbar looks for these CSS variables (with fallbacks):

```typescript
// In MobileNavBar.tsx - how colors are read:
const inactiveHsl = getComputedColor("--colors-buttons-list", "0 0% 60%");
const activeHsl = getComputedColor("--colors-buttons-active", "25 95% 53%");
const bgColor = "hsl(var(--colors-background-main, 0 0% 8%))";
```

### How to Inject CSS Variables from p-stream's Theme Store

In p-stream's theme store (likely in `themes/` folder), add this effect to inject CSS variables when a theme is selected:

```typescript
// Example: In your theme store or provider
useEffect(() => {
  const theme = currentTheme; // Your active theme object
  
  // Inject navbar-required variables
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

## Theme Object Structure Expected

The navbar expects themes to have this structure (adjust to match p-stream's actual schema):

```typescript
interface Theme {
  buttons: {
    list: string;    // HSL value for inactive icons (e.g., "0 0% 60%")
    active: string;  // HSL value for active icons (e.g., "25 95% 53%")
  };
  accent?: string;   // Optional secondary color for dual-color themes
  background?: {
    main: string;    // Dark background color (e.g., "0 0% 8%")
  };
  type?: {
    text: string;    // Text color (e.g., "0 0% 95%")
  };
}
```

---

## Layout Integration

Add MobileNavBar to pages where it should be visible:

```tsx
// In your page component
import MobileNavBar from "@/components/MobileNavBar";

const HomePage = () => {
  return (
    <div className="min-h-screen pb-24"> {/* pb-24 for navbar space */}
      {/* Page content */}
      <MobileNavBar />
    </div>
  );
};
```

### Hide on Specific Routes

To hide the navbar on settings/onboarding pages, use conditional rendering:

```tsx
// In your layout component
import { useLocation } from "react-router-dom";
import MobileNavBar from "@/components/MobileNavBar";

const Layout = ({ children }) => {
  const location = useLocation();
  
  const hideNavRoutes = ["/settings", "/onboarding", "/login"];
  const showNav = !hideNavRoutes.some(r => location.pathname.startsWith(r));
  
  return (
    <div>
      {children}
      {showNav && <MobileNavBar />}
    </div>
  );
};
```

---

## CSS Utilities Required

Add these to p-stream's global CSS (index.css or similar):

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

## Dependencies

Ensure these are installed in p-stream (likely already present):

- `react-router-dom` (for navigation)
- `lucide-react` (for icons)

---

## Route Mapping for MenuPopup

Update the paths in `MenuPopup.tsx` to match p-stream's actual routes:

```typescript
const menuItems = [
  { id: "movies", label: "Movies", path: "/movies", emoji: "🎬" },
  { id: "tvshows", label: "TV Shows", path: "/tv", emoji: "📺" },
  { id: "anime", label: "Anime", path: "/anime", emoji: "✨" },
  { id: "discover", label: "Discover", path: "/discover", emoji: "🧭" },
  { id: "favorites", label: "Favorites", path: "/favorites", emoji: "❤️" },
  { id: "settings", label: "Settings", path: "/settings", emoji: "⚙️" },
];
```

---

## Navbar Shape Specification

The navbar has a custom border-radius: flat top corners, rounded bottom corners.

```css
border-radius: 12px 12px 32px 32px;
```

---

## Testing After Integration

1. **Theme switching**: Change themes in Settings → Appearance. Navbar should update colors instantly.
2. **Navigation**: Tap each nav button. Active button should change color.
3. **Menu popup**: Tap center button. Menu should slide up with theme colors.
4. **Route hiding**: Navigate to `/settings`. Navbar should be hidden.

---

## Summary Checklist

- [ ] Copy `MobileNavBar.tsx` to `src/components/`
- [ ] Copy `MenuPopup.tsx` to `src/components/`
- [ ] Copy `nexus-logo.svg` to `src/assets/`
- [ ] Add CSS variable injection to theme store
- [ ] Add `.glow-pulse` CSS animation
- [ ] Add `<MobileNavBar />` to pages (with route-based hiding)
- [ ] Update `MenuPopup` paths to match p-stream routes
- [ ] Test theme switching and navigation
