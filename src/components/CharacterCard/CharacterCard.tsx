import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Badge } from "../UI/Badge";
import { CharacterStats } from "./CharacterStats";
import type { Character } from "../../types";

type CharacterCardProps = {
  character: Character;
  selected?: boolean;
  disabled?: boolean;
  compact?: boolean;
  animated?: boolean;
  onClick?: () => void;
  onSelect?: (character: Character) => void;
};

export const CharacterCard = memo(function CharacterCard({
  character,
  selected = false,
  disabled = false,
  compact = false,
  animated = true,
  onClick,
  onSelect,
}: CharacterCardProps) {
  const isOverLimit = Object.values(character.attributes).some((value) => value > 100);
  const className = `character-card ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""} ${compact ? "character-card--compact" : ""} ${isOverLimit ? "character-card--godscale" : ""}`;
  const handleClick = useCallback(() => {
    onClick?.();
    onSelect?.(character);
  }, [character, onClick, onSelect]);

  const content = (
    <>
      <span className="card-rarity">{character.rarity}</span>
      {isOverLimit && <span className="godscale-ribbon">Escala Deus</span>}
      <div className="card-image-wrap">
        <img
          src={character.image}
          alt={character.name}
          loading={compact ? "eager" : "lazy"}
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.parentElement?.classList.add("image-fallback");
          }}
        />
      </div>
      <div className="card-copy">
        <span className="anime-name">{character.anime}</span>
        <h3>{character.name}</h3>
        <p className="card-title">{character.title}</p>
        {!compact && <p className="card-description">{character.description}</p>}
      </div>
      <CharacterStats character={character} compact />
      {!compact && (
        <div className="power-badges">
          {character.powers.slice(0, 3).map((power, index) => (
            <Badge key={power} tone={index === 0 ? "violet" : index === 1 ? "ember" : "blue"}>
              {power}
            </Badge>
          ))}
        </div>
      )}
    </>
  );

  if (!animated) {
    return (
      <button type="button" className={className} onClick={handleClick} disabled={disabled}>
        {content}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 24, rotateX: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={disabled ? undefined : { y: -8, rotateX: 5, rotateY: -4, scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
    >
      {content}
    </motion.button>
  );
});
