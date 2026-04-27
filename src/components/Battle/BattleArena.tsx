import { Swords, Volume2, VolumeX } from "lucide-react";
import type { Character } from "../../types";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { Button } from "../UI/Button";
import { GlowPanel } from "../UI/GlowPanel";

type BattleArenaProps = {
  characterA: Character | null;
  characterB: Character | null;
  chaosMode: boolean;
  muted: boolean;
  onChaosChange: (enabled: boolean) => void;
  onMuteChange: (muted: boolean) => void;
  onBattle: () => void;
};

export function BattleArena({ characterA, characterB, chaosMode, muted, onChaosChange, onMuteChange, onBattle }: BattleArenaProps) {
  const ready = Boolean(characterA && characterB);

  return (
    <GlowPanel className="arena-panel">
      <div className="arena-header">
        <div>
          <span className="eyebrow">Mesa ativa</span>
          <h2>Duelo proibido</h2>
        </div>
        <div className="arena-toggles">
          <label className="switch-control">
            <input type="checkbox" checked={chaosMode} onChange={(event) => onChaosChange(event.target.checked)} />
            <span>Caos</span>
          </label>
          <button className="icon-toggle" type="button" onClick={() => onMuteChange(!muted)} aria-label={muted ? "Ativar som ritual" : "Silenciar som ritual"}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      <div className={`arena-slots ${ready ? "is-ready" : ""}`}>
        <div className="arena-slot">
          {characterA ? <CharacterCard character={characterA} compact selected /> : <div className="empty-card">Carta A</div>}
        </div>
        <div className="versus-orb">
          <Swords size={34} />
          <span>VS</span>
        </div>
        <div className="arena-slot">
          {characterB ? <CharacterCard character={characterB} compact selected /> : <div className="empty-card">Carta B</div>}
        </div>
      </div>

      <Button type="button" className="battle-button" icon={<Swords size={20} />} disabled={!ready} onClick={onBattle}>
        INICIAR X1
      </Button>
    </GlowPanel>
  );
}
