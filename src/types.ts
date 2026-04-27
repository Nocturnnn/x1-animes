export type AttributeKey =
  | "strength"
  | "speed"
  | "durability"
  | "intelligence"
  | "energy"
  | "technique"
  | "hax"
  | "stamina";

export type Character = {
  id: string;
  name: string;
  anime: string;
  image: string;
  title: string;
  description: string;
  rarity: "Arcana" | "Mythic" | "Eclipse" | "Relic";
  attributes: Record<AttributeKey, number>;
  powers: string[];
  traits: {
    immortality?: boolean;
    regeneration?: boolean;
    timeLoop?: boolean;
    realityManipulation?: boolean;
    overwhelmingPower?: boolean;
    extremeSpeed?: boolean;
    sealing?: boolean;
    strategy?: boolean;
    transformation?: boolean;
    antiMagic?: boolean;
    cursedEnergy?: boolean;
    mindControl?: boolean;
    deathNote?: boolean;
    titanForm?: boolean;
    cloneArmy?: boolean;
    spiritualPressure?: boolean;
    vampire?: boolean;
    absorption?: boolean;
  };
  weaknesses: string[];
  specialRules?: string[];
};

export type BattleResult = {
  winner: Character | null;
  loser: Character | null;
  isDraw: boolean;
  scoreA: number;
  scoreB: number;
  title: string;
  summary: string;
  reasons: string[];
  battleLog: string[];
  keyFactors: string[];
};
