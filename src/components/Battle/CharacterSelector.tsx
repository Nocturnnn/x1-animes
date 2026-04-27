import { Dices, Filter } from "lucide-react";
import type { Character } from "../../types";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { Button } from "../UI/Button";

type CharacterSelectorProps = {
  characters: Character[];
  selectedA: Character | null;
  selectedB: Character | null;
  animeFilter: string;
  onFilterChange: (anime: string) => void;
  onSelect: (character: Character) => void;
  onRandomize: () => void;
};

export function CharacterSelector({
  characters,
  selectedA,
  selectedB,
  animeFilter,
  onFilterChange,
  onSelect,
  onRandomize,
}: CharacterSelectorProps) {
  const animes = ["Todos", ...Array.from(new Set(characters.map((character) => character.anime)))];
  const visibleCharacters = animeFilter === "Todos" ? characters : characters.filter((character) => character.anime === animeFilter);

  return (
    <section className="selector-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Grimorio de cartas</span>
          <h2>Escolha os duelistas</h2>
        </div>
        <div className="selector-tools">
          <label className="filter-control">
            <Filter size={16} />
            <select value={animeFilter} onChange={(event) => onFilterChange(event.target.value)}>
              {animes.map((anime) => (
                <option key={anime} value={anime}>
                  {anime}
                </option>
              ))}
            </select>
          </label>
          <Button type="button" variant="ghost" icon={<Dices size={18} />} onClick={onRandomize}>
            Aleatorio
          </Button>
        </div>
      </div>

      <div className="choice-status">
        <span>Invocacao A: {selectedA?.name ?? "aguardando carta"}</span>
        <span>Invocacao B: {selectedB?.name ?? "aguardando rival"}</span>
      </div>

      <div className="card-grid">
        {visibleCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            selected={selectedA?.id === character.id || selectedB?.id === character.id}
            onClick={() => onSelect(character)}
          />
        ))}
      </div>
    </section>
  );
}
