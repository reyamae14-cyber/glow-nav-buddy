import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

interface SpinningRingProps {
  size?: number;
  children: React.ReactNode;
}

const SpinningRing = ({ size = 56, children }: SpinningRingProps) => {
  const { currentTheme } = useTheme();
  const ringSize = size + 28;
  const [glowIndex, setGlowIndex] = useState(0);
  
  // Symbols for the ring (mystical glyphs)
  const symbols = "◊△▽◁▷○◇⬡⬢◈⬟⬠⟐⟑⧫⬦◆●◐◑◒◓◔◕";
  const symbolCount = 20;
  const chevronCount = 5;
  
  // Animate the glow index to make symbols light up as they spin
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIndex((prev) => (prev + 1) % symbolCount);
    }, 400);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: ringSize, height: ringSize }}
    >
      {/* Spinning ring with symbols */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'spin 25s linear infinite',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <defs>
            {/* Glow filter for active symbols */}
            <filter id="symbolGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Stronger glow for chevrons */}
            <filter id="chevronGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Ring track */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="5"
            opacity="0.4"
          />
          
          {/* Symbols around the ring */}
          {Array.from({ length: symbolCount }).map((_, i) => {
            const angle = (i / symbolCount) * 360;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = 50 + 44 * Math.cos(radians);
            const y = 50 + 44 * Math.sin(radians);
            const symbol = symbols[i % symbols.length];
            
            // Determine if this symbol should glow
            const isGlowing = i === glowIndex || 
                              i === (glowIndex + 4) % symbolCount || 
                              i === (glowIndex + 8) % symbolCount || 
                              i === (glowIndex + 12) % symbolCount ||
                              i === (glowIndex + 16) % symbolCount;
            
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="4.5"
                fontWeight="bold"
                fill={isGlowing ? `hsl(${currentTheme.buttons.active})` : "hsl(var(--muted-foreground) / 0.6)"}
                filter={isGlowing ? "url(#symbolGlow)" : undefined}
                style={{
                  transition: 'fill 0.3s ease, filter 0.3s ease',
                }}
              >
                {symbol}
              </text>
            );
          })}
          
          {/* Glowing chevrons at cardinal points */}
          {Array.from({ length: chevronCount }).map((_, i) => {
            const angle = (i / chevronCount) * 360;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = 50 + 44 * Math.cos(radians);
            const y = 50 + 44 * Math.sin(radians);
            
            // Chevron lights up based on rotation
            const isActive = Math.floor(glowIndex / 4) === i;
            
            return (
              <g key={`chevron-${i}`}>
                <polygon
                  points={`${x},${y - 4} ${x + 3},${y + 3} ${x - 3},${y + 3}`}
                  fill={isActive ? `hsl(${currentTheme.buttons.active})` : `hsl(${currentTheme.buttons.active} / 0.3)`}
                  filter={isActive ? "url(#chevronGlow)" : undefined}
                  style={{
                    transition: 'fill 0.2s ease, filter 0.2s ease',
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: `${x}px ${y}px`,
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Center content (logo) */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpinningRing;
