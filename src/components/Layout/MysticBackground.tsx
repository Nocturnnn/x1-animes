import { memo } from "react";
import type { CSSProperties } from "react";

const particles = Array.from({ length: 24 }, (_, index) => ({
  index,
  style: {
    "--i": index,
    "--x": `${(index * 37) % 100}%`,
    "--y": `${(index * 53) % 100}%`,
  } as CSSProperties,
}));

export const MysticBackground = memo(function MysticBackground() {
  return (
    <div className="mystic-background" aria-hidden="true">
      <div className="wood-grain" />
      <div className="central-light" />
      <div className="mist mist-one" />
      <div className="mist mist-two" />
      <div className="particle-field">
        {particles.map((particle) => (
          <span key={particle.index} style={particle.style} />
        ))}
      </div>
    </div>
  );
});
