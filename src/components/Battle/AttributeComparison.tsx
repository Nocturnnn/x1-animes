import { memo } from "react";
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

const ATTRIBUTE_VISUAL_MAX = 150;

type AttributeComparisonProps = {
  characterA: Character;
  characterB: Character;
  result: BattleResult;
};

export const AttributeComparison = memo(function AttributeComparison({ characterA, characterB, result }: AttributeComparisonProps) {
  return (
    <div className="attribute-comparison">
      <div className="scale-legend">
        <span>0</span>
        <i>Escala comum ate 100</i>
        <strong>Escala Deus ate 150</strong>
      </div>
      <div className="score-line">
        <strong>{characterA.name}: {result.scoreA}</strong>
        <strong>{characterB.name}: {result.scoreB}</strong>
      </div>
      {attributes.map(([key, label]) => (
        <div className={`compare-row ${characterA.attributes[key] > 100 || characterB.attributes[key] > 100 ? "compare-row--overlimit" : ""}`} key={key}>
          <span>{characterA.attributes[key]}</span>
          <div className="compare-bar compare-bar--left">
            <i style={{ width: `${Math.min(100, (characterA.attributes[key] / ATTRIBUTE_VISUAL_MAX) * 100)}%` }} />
          </div>
          <b>{label}</b>
          <div className="compare-bar compare-bar--right">
            <i style={{ width: `${Math.min(100, (characterB.attributes[key] / ATTRIBUTE_VISUAL_MAX) * 100)}%` }} />
          </div>
          <span>{characterB.attributes[key]}</span>
        </div>
      ))}
    </div>
  );
});
