import React, { useState, useEffect, useRef } from 'react';

interface InteractiveMagnifierProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  active: boolean;
}

export const InteractiveMagnifier: React.FC<InteractiveMagnifierProps> = ({
  containerRef,
  active,
}) => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isInside, setIsInside] = useState(false);
  const magnifierSize = 180;
  const zoomLevel = 2.4;

  useEffect(() => {
    if (!active) {
      setPos(null);
      setIsInside(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setIsInside(true);
        setPos({ x, y });
      } else {
        setIsInside(false);
      }
    };

    const handleMouseLeave = () => {
      setIsInside(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active, containerRef]);

  if (!active || !isInside || !pos || !containerRef.current) return null;

  const rect = containerRef.current.getBoundingClientRect();
  const bgPosX = (pos.x / rect.width) * 100;
  const bgPosY = (pos.y / rect.height) * 100;

  return (
    <div
      className="absolute pointer-events-none z-40 transition-opacity duration-150"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer Rim */}
      <div
        className="relative rounded-full shadow-2xl border-4 border-slate-900 overflow-hidden bg-white/20 backdrop-blur-[1px]"
        style={{
          width: `${magnifierSize}px`,
          height: `${magnifierSize}px`,
          boxShadow: '0 20px 35px -5px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.6)',
        }}
      >
        {/* SVG Cloned Zoom view */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: `${bgPosX}% ${bgPosY}%`,
          }}
        >
          {/* Note: This magnifies through parent DOM scale */}
        </div>

        {/* Lens Glass Reflection Highlights */}
        <div className="absolute inset-2 rounded-full border-t-2 border-l-2 border-white/70 pointer-events-none" />
        <div className="absolute top-3 left-4 w-12 h-6 rounded-full bg-white/35 rotate-[-30deg] filter blur-[1px]" />

        {/* Crosshair indicator in center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-6 h-0.5 bg-slate-900" />
          <div className="h-6 w-0.5 bg-slate-900 absolute" />
        </div>
      </div>

      {/* Realistic Magnifier Handle */}
      <div
        className="w-4 h-16 bg-gradient-to-b from-slate-900 via-amber-950 to-amber-900 rounded-b-md shadow-lg border border-slate-800"
        style={{
          position: 'absolute',
          top: `${magnifierSize - 18}px`,
          left: `${magnifierSize - 18}px`,
          transform: 'rotate(-45deg)',
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
};
