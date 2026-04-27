import { motion } from "framer-motion";
import { Badge } from "../UI/Badge";
import { CharacterStats } from "./CharacterStats";
import type { Character } from "../../types";

type CharacterCardProps = {
  character: Character;
  selected?: boolean;
  disabled?: boolean;
  compact?: boolean;
  onClick?: () => void;
};

export function CharacterCard({ character, selected = false, disabled = false, compact = false, onClick }: CharacterCardProps) {
  return (
    <motion.button
      type="button"
      className={`character-card ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""} ${compact ? "character-card--compact" : ""}`}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 24, rotateX: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={disabled ? undefined : { y: -8, rotateX: 5, rotateY: -4, scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
    >
      <span className="card-rarity">{character.rarity}</span>
      <div className="card-image-wrap">
        <img
          src={character.image}
          alt={character.name}
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
    </motion.button>
  );
}
