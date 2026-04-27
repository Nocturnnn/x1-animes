import type { AttributeKey, Character } from "../../types";

const featuredStats: AttributeKey[] = ["strength", "speed", "hax", "technique"];

const labels: Record<AttributeKey, string> = {
  strength: "Forca",
  speed: "Veloc.",
  durability: "Defesa",
  intelligence: "Intel.",
  energy: "Energia",
  technique: "Tecnica",
  hax: "Hax",
  stamina: "Folego",
};

type CharacterStatsProps = {
  character: Character;
  compact?: boolean;
};

export function CharacterStats({ character, compact = false }: CharacterStatsProps) {
  const stats = compact ? featuredStats : (Object.keys(character.attributes) as AttributeKey[]);

  return (
    <div className={`card-stats ${compact ? "card-stats--compact" : ""}`}>
      {stats.map((stat) => (
        <div className="stat-row" key={stat}>
          <span>{labels[stat]}</span>
          <div className="stat-track">
            <i style={{ width: `${character.attributes[stat]}%` }} />
          </div>
          <b>{character.attributes[stat]}</b>
        </div>
      ))}
    </div>
  );
}
