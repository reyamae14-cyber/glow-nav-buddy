# MobileNavBar Integration Guide for p-stream

This guide explains how to integrate the MobileNavBar component into your p-stream project.

## Files to Copy

Copy these files from this project to your p-stream project:

### 1. Theme Context
```
src/contexts/ThemeContext.tsx → your-project/src/contexts/ThemeContext.tsx
```

### 2. Components
```
src/components/MobileNavBar.tsx → your-project/src/components/MobileNavBar.tsx
src/components/MenuPopup.tsx → your-project/src/components/MenuPopup.tsx
```

### 3. Assets
```
src/assets/nexus-logo.svg → your-project/src/assets/nexus-logo.svg
```

---

## CSS Variables to Add

Add these to your `index.css` or global CSS file:

```css
:root {
  /* Navigation specific */
  --nav-background: 0 0% 8%;
  --nav-foreground: 0 0% 95%;
  --nav-glow: 25 95% 53%;
  --nav-glow-intensity: 0.6;
  --nav-inactive: 0 0% 60%;
  --nav-active: 25 95% 53%;
  --nav-accent: 25 95% 53%;
}

/* Glow utilities */
@layer utilities {
  .glow-orange {
    filter: drop-shadow(0 0 8px hsl(var(--nav-glow) / var(--nav-glow-intensity)))
            drop-shadow(0 0 20px hsl(var(--nav-glow) / calc(var(--nav-glow-intensity) * 0.5)));
  }

  .glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }
}

@keyframes glow-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 8px hsl(var(--nav-glow) / var(--nav-glow-intensity)))
            drop-shadow(0 0 20px hsl(var(--nav-glow) / calc(var(--nav-glow-intensity) * 0.5)));
  }
  50% {
    filter: drop-shadow(0 0 15px hsl(var(--nav-glow) / calc(var(--nav-glow-intensity) + 0.2)))
            drop-shadow(0 0 35px hsl(var(--nav-glow) / var(--nav-glow-intensity)));
  }
}
```

---

## Integration Steps

### Step 1: Wrap App with ThemeProvider

In your `main.tsx` or `App.tsx`:

```tsx
import { ThemeProvider } from "@/contexts/ThemeContext";

// Wrap your app
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Step 2: Add MobileNavBar to Layout

In your main layout component (excluding Settings/Onboarding):

```tsx
import MobileNavBar from "@/components/MobileNavBar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide navbar on these routes
  const hideNavRoutes = ["/settings", "/onboarding", "/login"];
  const showNav = !hideNavRoutes.some(route => location.pathname.startsWith(route));
  
  return (
    <div>
      {children}
      {showNav && <MobileNavBar />}
    </div>
  );
};
```

### Step 3: Connect to Your Existing Theme System

If p-stream already has a theme store, modify `ThemeContext.tsx` to use your existing themes:

```tsx
// In ThemeContext.tsx, import your existing themes
import { useThemeStore } from "@/stores/theme"; // Your existing store

// Then sync the themes in useEffect
useEffect(() => {
  const pstreamTheme = useThemeStore.getState().currentTheme;
  // Map your p-stream theme to this format
  const mappedTheme = {
    name: pstreamTheme.name,
    buttons: {
      list: pstreamTheme.inactive, // Your inactive color
      active: pstreamTheme.primary, // Your primary color
    },
    accent: pstreamTheme.secondary, // Your secondary color (optional)
  };
  setCurrentTheme(mappedTheme);
}, []);
```

---

## Theme Color Logic

### Single Color Themes
- `buttons.list` = Inactive icon color (usually gray)
- `buttons.active` = Active icon color (the theme's main color)

### Dual Color Themes (has `accent`)
- `buttons.list` = Inactive icon color
- `buttons.active` = Primary active color (even-indexed icons: Home, Recent)
- `accent` = Secondary active color (odd-indexed icons: Search, Profile)

### Examples:
| Theme | Active | Accent | Effect |
|-------|--------|--------|--------|
| Christmas | Green | Red | Home=Green, Search=Red, Recent=Green, Profile=Red |
| Wolverine | Yellow | Blue | Home=Yellow, Search=Blue, Recent=Yellow, Profile=Blue |
| Spiderman | Red | Blue | Home=Red, Search=Blue, Recent=Red, Profile=Blue |

---

## Dependencies Required

Make sure these are installed:
```bash
npm install react-router-dom lucide-react clsx tailwind-merge
```

---

## Quick Test

After integration, test by:
1. Navigate between pages - icons should change color
2. Open the theme tester and switch themes
3. Check dual-color themes show alternating colors on active icons
4. Click Menu button - popup should appear with matching dark style
