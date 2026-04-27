import type { AttributeKey, BattleResult, Character } from "../../types";

const attributes: Array<[AttributeKey, string]> = [
  ["strength", "Forca"],
  ["speed", "Velocidade"],
  ["durability", "Durabilidade"],
  ["intelligence", "Inteligencia"],
  ["energy", "Energia"],
  ["technique", "Tecnica"],
  ["hax", "Hax"],
  ["stamina", "Folego"],
];

type AttributeComparisonProps = {
  characterA: Character;
  characterB: Character;
  result: BattleResult;
};

export function AttributeComparison({ characterA, characterB, result }: AttributeComparisonProps) {
  return (
    <div className="attribute-comparison">
      <div className="score-line">
        <strong>{characterA.name}: {result.scoreA}</strong>
        <strong>{characterB.name}: {result.scoreB}</strong>
      </div>
      {attributes.map(([key, label]) => (
        <div className="compare-row" key={key}>
          <span>{characterA.attributes[key]}</span>
          <div className="compare-bar compare-bar--left">
            <i style={{ width: `${characterA.attributes[key]}%` }} />
          </div>
          <b>{label}</b>
          <div className="compare-bar compare-bar--right">
            <i style={{ width: `${characterB.attributes[key]}%` }} />
          </div>
          <span>{characterB.attributes[key]}</span>
        </div>
      ))}
    </div>
  );
}
