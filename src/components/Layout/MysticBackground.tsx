import type { CSSProperties } from "react";

export function MysticBackground() {
  return (
    <div className="mystic-background" aria-hidden="true">
      <div className="wood-grain" />
      <div className="central-light" />
      <div className="mist mist-one" />
      <div className="mist mist-two" />
      <div className="particle-field">
        {Array.from({ length: 34 }).map((_, index) => {
          const style = {
            "--i": index,
            "--x": `${(index * 37) % 100}%`,
            "--y": `${(index * 53) % 100}%`,
          } as CSSProperties;

          return <span key={index} style={style} />;
        })}
      </div>
    </div>
  );
}
