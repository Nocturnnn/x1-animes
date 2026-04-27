import type { BattleResult, Character } from "../types";
import { applyPowerRules, hasUnresolvedReturnCondition } from "./powerRules";

const weights = {
  strength: 1.1,
  speed: 1,
  durability: 0.9,
  intelligence: 0.85,
  energy: 1,
  technique: 1.05,
  hax: 1.2,
  stamina: 0.9,
};

function baseScore(character: Character): number {
  return Object.entries(character.attributes).reduce((total, [key, value]) => {
    return total + value * weights[key as keyof typeof weights];
  }, 0) / 8;
}

function clampScore(value: number): number {
  return Math.round(Math.max(1, Math.min(180, value)));
}

function explainWinner(winner: Character, loser: Character, scoreWinner: number, scoreLoser: number, keyFactors: string[]): string {
  const gap = scoreWinner - scoreLoser;
  const tone = gap > 25 ? "com ampla margem" : gap > 12 ? "aproveitando vantagens claras" : "por uma diferenca estreita";
  const factorText = keyFactors.length > 0 ? ` Os fatores decisivos foram ${keyFactors.slice(0, 3).join(", ")}.` : "";
  return `${winner.name} vence ${tone}. A carta de ${loser.name} ainda oferece ameacas reais, mas ${winner.name} combina melhor atributos, counters e condicoes especiais dentro das regras da mesa.${factorText}`;
}

function canPermanentlyAnswer(attacker: Character, defender: Character): boolean {
  if (attacker.traits.sealing || attacker.traits.antiMagic || attacker.traits.absorption) return true;
  if (attacker.traits.realityManipulation && attacker.attributes.hax >= defender.attributes.hax - 8) return true;
  if (attacker.attributes.hax >= 96 && attacker.attributes.technique >= 90) return true;
  return false;
}

function applyMatchupClashes(
  characterA: Character,
  characterB: Character,
  scoreA: number,
  scoreB: number,
  reasons: string[],
  battleLog: string[],
  keyFactors: string[],
) {
  let nextA = scoreA;
  let nextB = scoreB;

  const apply = (side: "A" | "B", amount: number, reason: string, factor: string, log?: string) => {
    if (side === "A") nextA += amount;
    if (side === "B") nextB += amount;
    reasons.push(reason);
    keyFactors.push(factor);
    if (log) battleLog.push(log);
  };

  const evaluate = (self: Character, opponent: Character, side: "A" | "B") => {
    const speedGap = self.attributes.speed - opponent.attributes.speed;
    const techniqueGap = self.attributes.technique - opponent.attributes.technique;
    const intelligenceGap = self.attributes.intelligence - opponent.attributes.intelligence;

    if (self.traits.extremeSpeed && speedGap >= 35 && opponent.attributes.durability < 85) {
      apply(
        side,
        10,
        `${self.name} ameaca um blitz porque combina velocidade extrema com uma abertura defensiva de ${opponent.name}.`,
        "Blitz de velocidade",
        `${self.name} risca a mesa em uma linha de luz antes que ${opponent.name} estabilize a propria carta.`,
      );
    }

    if (self.traits.antiMagic && opponent.traits.realityManipulation) {
      apply(side, 10, `${self.name} nao anula tudo, mas reduz parte das regras sobrenaturais de ${opponent.name}.`, "Counter de anti-magia");
    }

    if (self.traits.sealing && (opponent.traits.immortality || opponent.traits.regeneration || opponent.traits.timeLoop)) {
      apply(side, 14, `${self.name} possui uma rota de selamento contra a condicao persistente de ${opponent.name}.`, "Selamento de condicao");
    }

    if (self.traits.deathNote && intelligenceGap >= 15 && opponent.attributes.speed < 85 && !opponent.traits.immortality) {
      apply(side, 12, `${self.name} tem tempo mental para montar uma condicao de vitoria por informacao contra ${opponent.name}.`, "Vitoria por preparo");
    }

    if (self.traits.mindControl && opponent.traits.overwhelmingPower && opponent.attributes.intelligence < 82) {
      apply(side, 11, `${self.name} transforma poder bruto em vulnerabilidade psicologica contra ${opponent.name}.`, "Controle contra forca bruta");
    }

    if (self.traits.absorption && opponent.traits.transformation && techniqueGap >= -5) {
      apply(side, 10, `${self.name} pode sobreviver a uma transformacao e aprender o padrao de energia de ${opponent.name}.`, "Adaptacao a transformacao");
    }

    if (self.traits.cloneArmy && opponent.traits.extremeSpeed && opponent.attributes.intelligence < 85) {
      apply(side, 7, `${self.name} dilui a vantagem de velocidade de ${opponent.name} com multiplos alvos e leituras falsas.`, "Distracao por clones");
    }

    if (self.attributes.technique >= 94 && opponent.attributes.strength >= 90 && opponent.attributes.intelligence < self.attributes.intelligence) {
      apply(side, 8, `${self.name} converte tecnica refinada em resposta contra a pressao fisica de ${opponent.name}.`, "Tecnica contra brutalidade");
    }

    if (self.traits.titanForm && opponent.attributes.speed >= 88 && opponent.attributes.technique >= 88) {
      apply(side, -8, `${self.name} perde parte da vantagem de escala porque ${opponent.name} tem velocidade e tecnica para explorar pontos cegos.`, "Ponto cego de escala");
    }
  };

  evaluate(characterA, characterB, "A");
  evaluate(characterB, characterA, "B");

  return { scoreA: nextA, scoreB: nextB };
}

export function simulateBattle(characterA: Character, characterB: Character, chaosMode = false): BattleResult {
  const reasons: string[] = [];
  const battleLog: string[] = [
    `As cartas de ${characterA.name} e ${characterB.name} sao colocadas sob a luz central.`,
    "A mesa avalia atributos, fraquezas, poderes especiais e condicoes de vitoria.",
  ];
  const keyFactors: string[] = [];

  let scoreA = baseScore(characterA);
  let scoreB = baseScore(characterB);

  if (chaosMode) {
    const swingA = Math.round((Math.random() - 0.5) * 12);
    const swingB = Math.round((Math.random() - 0.5) * 12);
    scoreA += swingA;
    scoreB += swingB;
    battleLog.push(`Modo caos altera levemente a leitura da mesa: ${characterA.name} ${swingA >= 0 ? "+" : ""}${swingA}, ${characterB.name} ${swingB >= 0 ? "+" : ""}${swingB}.`);
    keyFactors.push("Modo caos");
  }

  scoreA = applyPowerRules({ self: characterA, opponent: characterB, score: scoreA, reasons, logs: battleLog, factors: keyFactors });
  scoreB = applyPowerRules({ self: characterB, opponent: characterA, score: scoreB, reasons, logs: battleLog, factors: keyFactors });

  const clashScores = applyMatchupClashes(characterA, characterB, scoreA, scoreB, reasons, battleLog, keyFactors);
  scoreA = clashScores.scoreA;
  scoreB = clashScores.scoreB;

  const initialA = scoreA;
  const initialB = scoreB;
  const topA = scoreA >= scoreB ? characterA : characterB;
  const topB = topA.id === characterA.id ? characterB : characterA;

  if (hasUnresolvedReturnCondition(topB, topA)) {
    const scoreAClamped = clampScore(initialA);
    const scoreBClamped = clampScore(initialB + 14);
    return {
      winner: null,
      loser: null,
      isDraw: true,
      scoreA: scoreAClamped,
      scoreB: scoreBClamped,
      title: "Empate tecnico: ciclo sem conclusao",
      summary: `${topA.name} venceria o confronto inicial pela pressao direta, mas ${topB.name} possui uma condicao de retorno que impede uma derrota simples. Sem uma forma clara de apagar o ciclo, selar a causa ou anular a repeticao, a mesa registra empate tecnico.`,
      reasons: [
        ...reasons,
        `${topB.name} nao supera necessariamente ${topA.name} no impacto imediato, mas sua regra especial impede uma conclusao definitiva.`,
      ],
      battleLog: [
        ...battleLog,
        `${topA.name} domina o primeiro desfecho fisico.`,
        `${topB.name} retorna a mesa por uma regra especial e reabre a linha do destino.`,
      ],
      keyFactors: Array.from(new Set([...keyFactors, "Retorno temporal", "Ausencia de anulacao causal"])),
    };
  }

  const delta = Math.abs(scoreA - scoreB);
  const incompatibleWinConditions =
    (characterA.traits.realityManipulation && characterB.traits.antiMagic) ||
    (characterB.traits.realityManipulation && characterA.traits.antiMagic) ||
    (characterA.traits.regeneration && characterB.traits.regeneration && delta < 12) ||
    (characterA.traits.immortality && !canPermanentlyAnswer(characterB, characterA) && delta < 18) ||
    (characterB.traits.immortality && !canPermanentlyAnswer(characterA, characterB) && delta < 18) ||
    (characterA.attributes.hax >= 94 && characterB.attributes.hax >= 94 && delta < 8);

  const persistentLoser =
    scoreA > scoreB
      ? characterB.traits.immortality || characterB.traits.timeLoop || characterB.traits.regeneration
      : characterA.traits.immortality || characterA.traits.timeLoop || characterA.traits.regeneration;
  const persistentWinner = scoreA > scoreB ? characterA : characterB;
  const persistentDefender = scoreA > scoreB ? characterB : characterA;

  if (persistentLoser && delta < 16 && !canPermanentlyAnswer(persistentWinner, persistentDefender)) {
    return {
      winner: null,
      loser: null,
      isDraw: true,
      scoreA: clampScore(scoreA),
      scoreB: clampScore(scoreB),
      title: "Empate por condicao persistente",
      summary: `${persistentWinner.name} encontra vantagem no placar, mas ${persistentDefender.name} possui uma condicao de sobrevivencia que nao e encerrada de forma definitiva. Sem selamento, anulacao, absorcao ou hax superior o bastante, o X1 vira um impasse narrativo.`,
      reasons: [...reasons, `${persistentDefender.name} continua retornando, regenerando ou resistindo alem do que a vantagem numerica resolve.`],
      battleLog: [...battleLog, "A carta derrotada nao se apaga; a mesa reconhece uma condicao persistente ativa."],
      keyFactors: Array.from(new Set([...keyFactors, "Condicao persistente", "Sem finalizacao definitiva"])),
    };
  }

  if (delta <= 5 || incompatibleWinConditions) {
    return {
      winner: null,
      loser: null,
      isDraw: true,
      scoreA: clampScore(scoreA),
      scoreB: clampScore(scoreB),
      title: "Empate ritualistico",
      summary: `${characterA.name} e ${characterB.name} se anulam em pontos criticos. A diferenca final e pequena ou as condicoes especiais criam uma trava narrativa, fazendo a mesa declarar um empate sem vencedor absoluto.`,
      reasons: [...reasons, "A diferenca de pontuacao ficou pequena demais ou as condicoes de vitoria se travaram mutuamente."],
      battleLog: [...battleLog, "As luzes da mesa oscilam sem escolher uma carta soberana."],
      keyFactors: Array.from(new Set([...keyFactors, "Poderes em equilibrio"])),
    };
  }

  const winner = scoreA > scoreB ? characterA : characterB;
  const loser = winner.id === characterA.id ? characterB : characterA;
  const winnerScore = winner.id === characterA.id ? scoreA : scoreB;
  const loserScore = winner.id === characterA.id ? scoreB : scoreA;

  return {
    winner,
    loser,
    isDraw: false,
    scoreA: clampScore(scoreA),
    scoreB: clampScore(scoreB),
    title: `${winner.name} vence o X1`,
    summary: explainWinner(winner, loser, winnerScore, loserScore, Array.from(new Set(keyFactors))),
    reasons,
    battleLog: [
      ...battleLog,
      `${winner.name} encontra a condicao dominante do duelo.`,
      `A carta de ${winner.name} brilha acima da mesa dos destinos.`,
    ],
    keyFactors: Array.from(new Set(keyFactors)).slice(0, 8),
  };
}
