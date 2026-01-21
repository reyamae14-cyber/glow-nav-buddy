import { Film, Tv, Sparkles, Compass, Heart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "movies", label: "Movies", icon: Film, emoji: "🎬" },
  { id: "tvshows", label: "TV Shows", icon: Tv, emoji: "📺" },
  { id: "anime", label: "Anime", icon: Sparkles, emoji: "✨" },
  { id: "discover", label: "Discover", icon: Compass, emoji: "🧭" },
  { id: "favorites", label: "Favorites", icon: Heart, emoji: "❤️" },
  { id: "settings", label: "Settings", icon: Settings, emoji: "⚙️" },
];

const MenuPopup = ({ isOpen, onClose }: MenuPopupProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Menu Box */}
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 w-[280px] animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="bg-card rounded-2xl p-4 shadow-xl border border-border/50">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <h3 className="text-lg font-semibold text-foreground">Browse Nexus</h3>
          </div>
          
          {/* Menu Grid */}
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  // Handle menu item click
                  onClose();
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl",
                  "bg-muted/50 hover:bg-muted transition-colors duration-200",
                  "active:scale-95 transition-transform"
                )}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPopup;
