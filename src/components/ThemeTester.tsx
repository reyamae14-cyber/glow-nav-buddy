import { cn } from "@/lib/utils";
import { useTheme, themes } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ThemeTester = () => {
  const { currentTheme, setTheme, saveTheme, isSaved } = useTheme();

  return (
    <div className="w-full px-4 pt-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-muted-foreground">Theme Tester ({themes.length} themes)</h2>
        <Button
          size="sm"
          onClick={saveTheme}
          disabled={isSaved}
          className={cn(
            "gap-1.5",
            isSaved && "bg-muted text-muted-foreground"
          )}
        >
          {isSaved ? (
            <>
              <Check className="h-4 w-4" />
              Saved
            </>
          ) : (
            "Save Theme"
          )}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => {
          const isActive = currentTheme.name === theme.name;
          return (
            <button
              key={theme.name}
              onClick={() => setTheme(theme)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-card ring-2 ring-primary"
                  : "hover:bg-card/50"
              )}
            >
              <div className="flex items-center gap-0.5">
                <div
                  className="w-5 h-5 rounded-full border border-border"
                  style={{ backgroundColor: `hsl(${theme.buttons.active})` }}
                />
                {theme.accent && (
                  <div
                    className="w-5 h-5 rounded-full border border-border"
                    style={{ backgroundColor: `hsl(${theme.accent})` }}
                  />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {theme.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeTester;
