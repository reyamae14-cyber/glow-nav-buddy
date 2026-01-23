import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ========================================
 * P-STREAM MENU POPUP
 * ========================================
 * 
 * LOCKED SPECIFICATIONS (DO NOT MODIFY):
 * - Background: Always #000000 (pure black)
 * - Position: bottom-28, centered
 * - Width: 280px
 * - Z-index: Popup(70), Backdrop(60)
 * - Animation: 300ms fade/slide
 */

// ============ LOCKED CONFIGURATION ============
const POPUP_CONFIG = {
  background: "#000000",
  width: 280,
  position: "bottom-28",
  zIndex: {
    backdrop: 60,
    popup: 70,
  },
  animation: {
    duration: 300,
    closeDelay: 250,
    navigateDelay: 200,
  },
  fallbackColors: {
    active: "25 95% 53%",
    text: "0 0% 95%",
  },
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

  // Read theme colors from CSS variables
  const getComputedColor = useCallback((varName: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return value || fallback;
  }, []);

  const activeHsl = getComputedColor("--colors-buttons-active", POPUP_CONFIG.fallbackColors.active);
  const textHsl = getComputedColor("--colors-type-text", POPUP_CONFIG.fallbackColors.text);

  // Handle open/close with animations
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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 backdrop-blur-sm"
        style={{
          zIndex: POPUP_CONFIG.zIndex.backdrop,
          background: 'rgba(0, 0, 0, 0.7)',
          animation: isClosing ? 'fadeOut 0.3s ease-out forwards' : 'fadeIn 0.3s ease-out forwards',
        }}
        onClick={handleClose}
      />
      
      {/* Menu Box - LOCKED BLACK BACKGROUND */}
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
          {/* Header */}
          <div 
            className="flex items-center gap-2 mb-4 px-1"
            style={{ 
              animation: isClosing ? 'itemFadeOut 0.2s ease-out forwards' : 'itemFadeIn 0.3s ease-out 0.1s forwards', 
              opacity: isClosing ? 1 : 0 
            }}
          >
            <div 
              className="w-1 h-5 rounded-full"
              style={{ background: `hsl(${activeHsl})` }}
            />
            <h3 
              className="text-lg font-semibold"
              style={{ color: `hsl(${textHsl})` }}
            >
              Browse
            </h3>
          </div>
          
          {/* Menu Grid */}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px hsl(${activeHsl} / 0.2)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                  {item.emoji}
                </span>
                <span 
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: `hsl(${textHsl})` }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
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
