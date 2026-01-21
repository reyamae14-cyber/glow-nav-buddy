import { useState } from "react";
import MobileNavBar from "@/components/MobileNavBar";
import ThemeTester, { themes, ThemeColors } from "@/components/ThemeTester";

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(themes[0]);

  const handleThemeChange = (theme: ThemeColors) => {
    setCurrentTheme(theme);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-foreground">Home</h1>
        <p className="mt-2 text-muted-foreground">Welcome to your app!</p>
        
        {/* Theme Tester Section */}
        <div className="mt-6">
          <ThemeTester 
            currentTheme={currentTheme.name} 
            onThemeChange={handleThemeChange} 
          />
        </div>
        
        <div className="mt-8 grid gap-4">
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <h2 className="font-semibold text-card-foreground">Getting Started</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Click a theme above to test different colors on the navigation bar below.
            </p>
          </div>
        </div>
      </div>
      <MobileNavBar theme={currentTheme} />
    </div>
  );
};

export default Index;
