import { Film, Tv, Sparkles, Compass, Heart, Settings } from "lucide-react";
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
 * A floating menu that appears when the center navbar button is clicked.
 * Uses p-stream's CSS variables for theming.
 * 
 * Required CSS variables:
 * - --colors-background-main: Dark background for the popup
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
