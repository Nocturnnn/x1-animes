import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Flame } from "lucide-react";
import { characters } from "./data/characters";
import type { BattleResult, Character } from "./types";
import { MysticBackground } from "./components/Layout/MysticBackground";
import { BattleTable } from "./components/Layout/BattleTable";
import { CharacterSelector } from "./components/Battle/CharacterSelector";
import { BattleArena } from "./components/Battle/BattleArena";
import { BattleResult as BattleResultView } from "./components/Battle/BattleResult";

function playRitualTone(muted: boolean) {
  if (muted) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audio = new AudioContextClass();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(94, audio.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(162, audio.currentTime + 0.4);
  gain.gain.setValueAtTime(0.001, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, audio.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.65);
  oscillator.connect(gain);
  gain.connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.7);
}

function App() {
  const [selectedA, setSelectedA] = useState<Character | null>(null);
  const [selectedB, setSelectedB] = useState<Character | null>(null);
  const [result, setResult] = useState<BattleResult | null>(null);
  const [animeFilter, setAnimeFilter] = useState("Todos");
  const [chaosMode, setChaosMode] = useState(false);
  const [muted, setMuted] = useState(true);
  const selectedARef = useRef<Character | null>(null);
  const selectedBRef = useRef<Character | null>(null);

  useEffect(() => {
    selectedARef.current = selectedA;
    selectedBRef.current = selectedB;
  }, [selectedA, selectedB]);

  const ranking = useMemo(() => {
    return [...characters]
      .map((character) => ({
        character,
        total: Math.round(Object.values(character.attributes).reduce((sum, value) => sum + value, 0) / 8),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, []);

  const handleSelect = useCallback((character: Character) => {
    const currentA = selectedARef.current;
    const currentB = selectedBRef.current;

    setResult(null);
    if (!currentA || currentA.id === character.id) {
      setSelectedA(character);
      return;
    }
    if (!currentB || currentB.id === character.id) {
      if (currentA.id !== character.id) setSelectedB(character);
      return;
    }
    setSelectedA(currentB);
    setSelectedB(character);
  }, []);

  const handleRandomize = useCallback(() => {
    const firstIndex = Math.floor(Math.random() * characters.length);
    let secondIndex = Math.floor(Math.random() * (characters.length - 1));
    if (secondIndex >= firstIndex) secondIndex += 1;
    setSelectedA(characters[firstIndex]);
    setSelectedB(characters[secondIndex]);
    setResult(null);
  }, []);

  const handleBattle = useCallback(async () => {
    if (!selectedA || !selectedB) return;
    playRitualTone(muted);
    const { simulateBattle } = await import("./logic/battleEngine");
    setResult(simulateBattle(selectedA, selectedB, chaosMode));
  }, [chaosMode, muted, selectedA, selectedB]);

  const handleReset = useCallback(() => {
    setResult(null);
  }, []);

  return (
    <>
      <MysticBackground />
      <BattleTable>
        <header className="hero">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <span className="eyebrow hero-kicker">
              <Flame size={16} />
              simulador ritualistico ficticio de cartas
            </span>
            <h1>Anime X1: Mesa dos Destinos</h1>
            <p>
              Escolha dois personagens, invoque suas cartas e descubra quem venceria em um duelo onde forca, estrategia
              e poderes absurdos decidem o destino.
            </p>
          </motion.div>
          <motion.aside className="ranking-panel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <span className="eyebrow">
              <Crown size={15} />
              ranking arcano
            </span>
            {ranking.map(({ character, total }, index) => (
              <div className="ranking-row" key={character.id}>
                <b>{index + 1}</b>
                <span>{character.name}</span>
                <i>{total}</i>
              </div>
            ))}
          </motion.aside>
        </header>

        <BattleArena
          characterA={selectedA}
          characterB={selectedB}
          chaosMode={chaosMode}
          muted={muted}
          onChaosChange={setChaosMode}
          onMuteChange={setMuted}
          onBattle={handleBattle}
        />

        <BattleResultView result={result} characterA={selectedA} characterB={selectedB} onReset={handleReset} />

        <CharacterSelector
          characters={characters}
          selectedA={selectedA}
          selectedB={selectedB}
          animeFilter={animeFilter}
          onFilterChange={setAnimeFilter}
          onSelect={handleSelect}
          onRandomize={handleRandomize}
        />
      </BattleTable>
    </>
  );
}

export default App;
