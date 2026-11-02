import type { CSSProperties } from "react";
import { createPortal } from "react-dom";

export type ConfettiOrigin = { x: number; y: number };

const particles = Array.from({ length: 30 }, (_, index) => {
  const direction = (index / 29) * Math.PI;
  const distance = 90 + ((index * 37) % 100);
  return {
    x: Math.cos(direction) * distance,
    y: -65 - Math.sin(direction) * distance,
    rotation: (index % 2 ? -1 : 1) * (180 + ((index * 47) % 360)),
    color: ["var(--gui-color-1)", "var(--gui-color-3)", "var(--gui-text)"][index % 3],
  };
});

export function ConfettiBurst({ origin }: { origin: ConfettiOrigin | null }) {
  if (!origin) return null;
  return createPortal(
    <div className="confetti-burst" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          style={
            {
              left: origin.x,
              top: origin.y,
              backgroundColor: particle.color,
              "--confetti-x": `${particle.x}px`,
              "--confetti-peak-x": `${particle.x * 0.65}px`,
              "--confetti-y": `${particle.y}px`,
              "--confetti-fall-y": `${particle.y + 150}px`,
              "--confetti-rotation": `${particle.rotation}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>,
    document.body,
  );
}
