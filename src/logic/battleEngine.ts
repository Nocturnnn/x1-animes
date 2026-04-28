import type { BattleResult, Character } from "../types";
import { analyzeLoreMatchup, getLoreProfile, hasTrueScaleBreaker, isGodTier, isSatireForce, reliesOnSoftWinCondition } from "./characterLore";
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
  return Math.round(Math.max(1, Math.min(320, value)));
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

function characterText(character: Character): string {
  return [character.title, character.description, ...character.powers, ...character.weaknesses, ...(character.specialRules ?? [])]
    .join(" ")
    .toLowerCase();
}

function hasTerm(character: Character, terms: string[]): boolean {
  const text = characterText(character);
  return terms.some((term) => text.includes(term));
}

function addUnique(items: string[], value: string): void {
  if (!items.includes(value)) items.push(value);
}

function controlScore(character: Character): number {
  return character.attributes.intelligence * 0.35 + character.attributes.technique * 0.4 + character.attributes.hax * 0.25;
}

function finisherScore(character: Character): number {
  return character.attributes.strength * 0.3 + character.attributes.energy * 0.25 + character.attributes.hax * 0.25 + character.attributes.technique * 0.2;
}

function applyBattlePhases(
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

  const initiativeA = characterA.attributes.speed * 0.45 + characterA.attributes.technique * 0.25 + characterA.attributes.intelligence * 0.2 + characterA.attributes.hax * 0.1;
  const initiativeB = characterB.attributes.speed * 0.45 + characterB.attributes.technique * 0.25 + characterB.attributes.intelligence * 0.2 + characterB.attributes.hax * 0.1;
  const controlA = controlScore(characterA);
  const controlB = controlScore(characterB);
  const finishA = finisherScore(characterA);
  const finishB = finisherScore(characterB);
  const sustainA = characterA.attributes.durability * 0.35 + characterA.attributes.stamina * 0.45 + (characterA.traits.regeneration ? 15 : 0) + (characterA.traits.immortality ? 12 : 0);
  const sustainB = characterB.attributes.durability * 0.35 + characterB.attributes.stamina * 0.45 + (characterB.traits.regeneration ? 15 : 0) + (characterB.traits.immortality ? 12 : 0);

  battleLog.push("A mesa divide o X1 em abertura, controle, finalizacao e desgaste.");

  if (Math.abs(initiativeA - initiativeB) >= 10) {
    const leader = initiativeA > initiativeB ? characterA : characterB;
    const side = leader.id === characterA.id ? "A" : "B";
    const bonus = Math.min(9, Math.round(Math.abs(initiativeA - initiativeB) / 4));
    if (side === "A") nextA += bonus;
    else nextB += bonus;
    reasons.push(`${leader.name} domina a abertura por iniciativa, juntando velocidade, tecnica e leitura inicial.`);
    battleLog.push(`${leader.name} dita o primeiro compasso antes da mesa estabilizar as condicoes especiais.`);
    addUnique(keyFactors, "Abertura dominante");
  }

  if (Math.abs(controlA - controlB) >= 9) {
    const controller = controlA > controlB ? characterA : characterB;
    const side = controller.id === characterA.id ? "A" : "B";
    const bonus = Math.min(10, Math.round(Math.abs(controlA - controlB) / 4));
    if (side === "A") nextA += bonus;
    else nextB += bonus;
    reasons.push(`${controller.name} vence a camada de controle, onde inteligencia, tecnica e hax decidem quem escolhe o formato da luta.`);
    addUnique(keyFactors, "Controle tatico");
  }

  if (Math.abs(finishA - finishB) >= 12) {
    const finisher = finishA > finishB ? characterA : characterB;
    const defender = finisher.id === characterA.id ? characterB : characterA;
    const side = finisher.id === characterA.id ? "A" : "B";
    const hasAnswer = canPermanentlyAnswer(finisher, defender) || !defender.traits.immortality;
    const bonus = hasAnswer ? 11 : 5;
    if (side === "A") nextA += bonus;
    else nextB += bonus;
    reasons.push(`${finisher.name} possui uma finalizacao mais convincente ${hasAnswer ? "e consegue transforma-la em condicao real de vitoria" : "mas ainda sofre para encerrar uma condicao persistente"}.`);
    battleLog.push(`A carta de ${finisher.name} procura o golpe que nao seja apenas forte, mas conclusivo.`);
    addUnique(keyFactors, hasAnswer ? "Finalizacao clara" : "Finalizacao incompleta");
  }

  if (Math.abs(sustainA - sustainB) >= 13) {
    const survivor = sustainA > sustainB ? characterA : characterB;
    const side = survivor.id === characterA.id ? "A" : "B";
    const bonus = Math.min(9, Math.round(Math.abs(sustainA - sustainB) / 5));
    if (side === "A") nextA += bonus;
    else nextB += bonus;
    reasons.push(`${survivor.name} cresce se a luta passa da primeira troca, porque durabilidade, stamina e sobrevivencia favorecem o desgaste.`);
    addUnique(keyFactors, "Vantagem no desgaste");
  }

  return { scoreA: nextA, scoreB: nextB };
}

function applyLoreLayer(
  characterA: Character,
  characterB: Character,
  scoreA: number,
  scoreB: number,
  reasons: string[],
  battleLog: string[],
  keyFactors: string[],
) {
  const profileA = getLoreProfile(characterA);
  const profileB = getLoreProfile(characterB);
  let nextA = scoreA;
  let nextB = scoreB;

  if (!profileA || !profileB) return { scoreA: nextA, scoreB: nextB };

  battleLog.push(`${characterA.name} entra com ${profileA.signature}; ${characterB.name} responde com ${profileB.signature}.`);
  battleLog.push(`Plano central de ${characterA.name}: ${profileA.winCondition}.`);
  battleLog.push(`Plano central de ${characterB.name}: ${profileB.winCondition}.`);

  const loreA = analyzeLoreMatchup(characterA, characterB);
  const loreB = analyzeLoreMatchup(characterB, characterA);
  nextA += loreA.scoreDelta;
  nextB += loreB.scoreDelta;

  reasons.push(...loreA.reasons, ...loreB.reasons);
  battleLog.push(...loreA.logs, ...loreB.logs);
  keyFactors.push(...loreA.factors, ...loreB.factors);

  return { scoreA: nextA, scoreB: nextB };
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
    const hasRange = hasTerm(self, ["longo alcance", "telecinese", "barreiras", "magia ofensiva", "ki", "getsuga", "pressao espiritual"]);
    const hasCloseRangeKit = hasTerm(self, ["punho", "espadas", "corte", "motosserra", "smashes", "dragon slayer"]);
    const opponentHasRange = hasTerm(opponent, ["longo alcance", "telecinese", "barreiras", "magia ofensiva", "ki", "getsuga", "pressao espiritual"]);
    const hasOneShotCondition = self.traits.deathNote || hasTerm(self, ["geass", "parada temporal", "dominio", "selamento espiritual", "retorno temporal"]);
    const opponentHasDetection = opponent.attributes.intelligence >= 92 || opponent.traits.strategy || hasTerm(opponent, ["sharingan", "seis olhos", "percepcao", "olfato", "analise"]);

    if (self.traits.extremeSpeed && speedGap >= 35 && opponent.attributes.durability < 85) {
      apply(
        side,
        10,
        `${self.name} ameaca um blitz porque combina velocidade extrema com uma abertura defensiva de ${opponent.name}.`,
        "Blitz de velocidade",
        `${self.name} risca a mesa em uma linha de luz antes que ${opponent.name} estabilize a propria carta.`,
      );
    }

    if (self.traits.extremeSpeed && opponent.traits.mindControl && speedGap >= 30) {
      apply(side, 8, `${self.name} pode quebrar a janela de comando mental de ${opponent.name} com entrada rapida demais para preparo confortavel.`, "Blitz contra controle");
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

    if (hasOneShotCondition && opponentHasDetection && opponent.attributes.speed >= 85) {
      apply(side, -6, `${self.name} tem uma condicao perigosa, mas ${opponent.name} combina percepcao e velocidade para pressionar antes do xeque-mate ficar limpo.`, "Condicao pressionada");
    }

    if (self.traits.mindControl && opponent.traits.overwhelmingPower && opponent.attributes.intelligence < 82) {
      apply(side, 11, `${self.name} transforma poder bruto em vulnerabilidade psicologica contra ${opponent.name}.`, "Controle contra forca bruta");
    }

    if (self.traits.mindControl && opponent.attributes.intelligence >= 96 && opponent.traits.strategy) {
      apply(side, -7, `${self.name} encontra resistencia alta porque ${opponent.name} analisa blefes, gatilhos e comandos em tempo real.`, "Resistencia mental");
    }

    if (self.traits.absorption && opponent.traits.transformation && techniqueGap >= -5) {
      apply(side, 10, `${self.name} pode sobreviver a uma transformacao e aprender o padrao de energia de ${opponent.name}.`, "Adaptacao a transformacao");
    }

    if (self.traits.cloneArmy && opponent.traits.extremeSpeed && opponent.attributes.intelligence < 85) {
      apply(side, 7, `${self.name} dilui a vantagem de velocidade de ${opponent.name} com multiplos alvos e leituras falsas.`, "Distracao por clones");
    }

    if (hasRange && hasCloseRangeKit && !opponentHasRange && opponent.attributes.speed < self.attributes.speed + 8) {
      apply(side, 7, `${self.name} alterna alcance e curta distancia, obrigando ${opponent.name} a defender dois ritmos diferentes.`, "Pressao hibrida");
    }

    if (hasCloseRangeKit && opponentHasRange && opponent.attributes.speed >= self.attributes.speed + 10) {
      apply(side, -6, `${self.name} precisa fechar distancia, mas ${opponent.name} tem alcance e mobilidade para negar entradas simples.`, "Dificuldade de aproximacao");
    }

    if (self.attributes.technique >= 94 && opponent.attributes.strength >= 90 && opponent.attributes.intelligence < self.attributes.intelligence) {
      apply(side, 8, `${self.name} converte tecnica refinada em resposta contra a pressao fisica de ${opponent.name}.`, "Tecnica contra brutalidade");
    }

    if (self.attributes.intelligence >= 95 && opponent.attributes.hax >= 90 && !opponent.traits.strategy) {
      apply(side, 6, `${self.name} le melhor as regras especiais de ${opponent.name} e evita transformar o duelo em uma troca cega de hax.`, "Leitura de hax");
    }

    if (self.traits.titanForm && opponent.attributes.speed >= 88 && opponent.attributes.technique >= 88) {
      apply(side, -8, `${self.name} perde parte da vantagem de escala porque ${opponent.name} tem velocidade e tecnica para explorar pontos cegos.`, "Ponto cego de escala");
    }

    if (self.traits.vampire && hasTerm(opponent, ["luz solar", "santas", "anti-magia", "selamento espiritual"])) {
      apply(side, -8, `${self.name} perde seguranca narrativa porque ${opponent.name} carrega ferramentas que podem limitar vampirismo ou regeneracao.`, "Counter anti-imortal");
    }
  };

  evaluate(characterA, characterB, "A");
  evaluate(characterB, characterA, "B");

  return { scoreA: nextA, scoreB: nextB };
}

function applyGodTierSanityCheck(
  characterA: Character,
  characterB: Character,
  scoreA: number,
  scoreB: number,
  reasons: string[],
  battleLog: string[],
  keyFactors: string[],
) {
  const profileA = getLoreProfile(characterA);
  const profileB = getLoreProfile(characterB);
  let nextA = scoreA;
  let nextB = scoreB;

  if (!profileA || !profileB) return { scoreA: nextA, scoreB: nextB };

  const protectGodTier = (god: Character, challenger: Character, godSide: "A" | "B") => {
    const godProfile = godSide === "A" ? profileA : profileB;
    const challengerProfile = godSide === "A" ? profileB : profileA;
    const godScore = godSide === "A" ? nextA : nextB;
    const challengerScore = godSide === "A" ? nextB : nextA;

    if (!isGodTier(godProfile) || hasTrueScaleBreaker(challengerProfile) || !reliesOnSoftWinCondition(challengerProfile)) return;
    if (challengerScore <= godScore - 8) return;

    const correction = challengerScore - godScore + 18;
    if (godSide === "A") nextA += correction;
    else nextB += correction;

    reasons.push(`${challenger.name} tem hax perigoso, mas nao apresenta uma finalizacao proporcional a feitos de escala divina de ${god.name}. Controle, preparo, inteligencia ou semi-imortalidade podem atrasar o duelo, nao provar a derrota de alguem capaz de devastar mundos ou ignorar dano comum.`);
    battleLog.push(`A mesa aplica a regra de abismo de escala: ${god.name} exige counter absoluto, nao apenas vantagem mental ou contrato.`);
    keyFactors.push("Regra de escala divina");
  };

  const protectPlanetaryScale = (god: Character, challenger: Character, godSide: "A" | "B") => {
    const godProfile = godSide === "A" ? profileA : profileB;
    const challengerProfile = godSide === "A" ? profileB : profileA;
    const godScore = godSide === "A" ? nextA : nextB;
    const challengerScore = godSide === "A" ? nextB : nextA;

    if (!isGodTier(godProfile) || isGodTier(challengerProfile) || hasTrueScaleBreaker(challengerProfile)) return;
    if (challengerScore < godScore - 20) return;

    const correction = challengerScore - godScore + 26;
    if (godSide === "A") nextA += correction;
    else nextB += correction;

    reasons.push(`${god.name} recebe prioridade por escala planetaria/divina: ${challenger.name} pode ter tecnica, clones, dominio ou selamento comum, mas sem counter absoluto isso nao supera feitos de destruicao e durabilidade em outro patamar.`);
    battleLog.push(`A mesa recalibra o abismo de escala: feitos de ${god.name} pesam acima de vantagens numericas de ${challenger.name}.`);
    keyFactors.push("Prioridade planetaria");
  };

  protectGodTier(characterA, characterB, "A");
  protectGodTier(characterB, characterA, "B");
  protectPlanetaryScale(characterA, characterB, "A");
  protectPlanetaryScale(characterB, characterA, "B");

  return { scoreA: nextA, scoreB: nextB };
}

function resolveSatireForceBattle(
  characterA: Character,
  characterB: Character,
  scoreA: number,
  scoreB: number,
  reasons: string[],
  battleLog: string[],
  keyFactors: string[],
): BattleResult | null {
  const profileA = getLoreProfile(characterA);
  const profileB = getLoreProfile(characterB);
  if (!profileA || !profileB) return null;

  const satireCharacter = isSatireForce(profileA) ? characterA : isSatireForce(profileB) ? characterB : null;
  if (!satireCharacter) return null;

  const opponent = satireCharacter.id === characterA.id ? characterB : characterA;
  const opponentProfile = satireCharacter.id === characterA.id ? profileB : profileA;
  const satireScore = satireCharacter.id === characterA.id ? scoreA : scoreB;
  const opponentScore = satireCharacter.id === characterA.id ? scoreB : scoreA;
  const opponentCanStallSatire = opponent.traits.timeLoop || opponentProfile.tags.includes("time-loop") || opponentProfile.tags.includes("instant-sealing");

  if (opponentCanStallSatire) {
    return {
      winner: null,
      loser: null,
      isDraw: true,
      scoreA: clampScore(satireCharacter.id === characterA.id ? Math.max(scoreA, scoreB + 8) : scoreA),
      scoreB: clampScore(satireCharacter.id === characterB.id ? Math.max(scoreB, scoreA + 8) : scoreB),
      title: "Empate satirico: ninguem derrota Saitama",
      summary: `${satireCharacter.name} nao perde porque sua propria premissa e ser a satira do poder absoluto. ${opponent.name} pode criar uma trava narrativa, loop ou contencao temporaria, mas isso nao vira uma vitoria real contra alguem escrito para ultrapassar qualquer escala de combate.`,
      reasons: [
        ...reasons,
        `${satireCharacter.name} tem limiter removido e funcao narrativa de quebrar escalas; o melhor counter aqui e atrasar ou travar a conclusao, nao derrota-lo.`,
      ],
      battleLog: [
        ...battleLog,
        `${opponent.name} tenta transformar o duelo em regra especial.`,
        `${satireCharacter.name} atravessa a logica do confronto como piada de poder: a mesa se recusa a registrar derrota.`,
      ],
      keyFactors: Array.from(new Set([...keyFactors, "Satira de poder", "Limiter removido", "Sem derrota valida"])),
    };
  }

  const finalSatireScore = Math.max(satireScore, opponentScore + 40);
  return {
    winner: satireCharacter,
    loser: opponent,
    isDraw: false,
    scoreA: clampScore(satireCharacter.id === characterA.id ? finalSatireScore : scoreA),
    scoreB: clampScore(satireCharacter.id === characterB.id ? finalSatireScore : scoreB),
    title: `${satireCharacter.name} vence o X1`,
    summary: `${satireCharacter.name} vence porque sua regra central nao e apenas ser forte: ele e uma satira de poder sem limite conhecido. Hax, inteligencia, controle ou semi-imortalidade podem criar cenas interessantes, mas nao estabelecem uma forma consistente de derrota-lo.`,
    reasons: [
      ...reasons,
      `${satireCharacter.name} nao pode ser vencido por escalonamento normal: se o adversario aumenta a regra, a piada do personagem e ultrapassar a regra.`,
    ],
    battleLog: [
      ...battleLog,
      `${opponent.name} revela sua melhor condicao de vitoria.`,
      `${satireCharacter.name} responde com a simplicidade absurda de um personagem feito para encerrar escalas.`,
      `A mesa registra que contra ${satireCharacter.name}, vencer por numeros ou hax comum nao e uma opcao.`,
    ],
    keyFactors: Array.from(new Set([...keyFactors, "Satira de poder", "Limiter removido", "Invencibilidade narrativa"])).slice(0, 8),
  };
}

function applyEndgameCanonOverrides(
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

  const applyYujiVsSukuna = (yuji: Character, sukuna: Character, yujiSide: "A" | "B") => {
    if (yuji.id !== "yuji" || sukuna.id !== "sukuna") return;
    const yujiScore = yujiSide === "A" ? nextA : nextB;
    const sukunaScore = yujiSide === "A" ? nextB : nextA;
    const correction = Math.max(18, sukunaScore - yujiScore + 12);
    if (yujiSide === "A") nextA += correction;
    else nextB += correction;
    reasons.push(`${yuji.name} e avaliado em versao de fim de manga: seus golpes na alma e Black Flash consecutivo sao exatamente o tipo de dano que desestabiliza ${sukuna.name}, entao o matchup canonico pesa mais que a superioridade generica de dominio.`);
    battleLog.push(`${yuji.name} mira a fronteira da alma em vez de tentar vencer ${sukuna.name} apenas por numero bruto.`);
    keyFactors.push("Fim de manga: Yuji countera Sukuna");
  };

  applyYujiVsSukuna(characterA, characterB, "A");
  applyYujiVsSukuna(characterB, characterA, "B");

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

  const loreScores = applyLoreLayer(characterA, characterB, scoreA, scoreB, reasons, battleLog, keyFactors);
  scoreA = loreScores.scoreA;
  scoreB = loreScores.scoreB;

  const phaseScores = applyBattlePhases(characterA, characterB, scoreA, scoreB, reasons, battleLog, keyFactors);
  scoreA = phaseScores.scoreA;
  scoreB = phaseScores.scoreB;

  const clashScores = applyMatchupClashes(characterA, characterB, scoreA, scoreB, reasons, battleLog, keyFactors);
  scoreA = clashScores.scoreA;
  scoreB = clashScores.scoreB;

  const godTierScores = applyGodTierSanityCheck(characterA, characterB, scoreA, scoreB, reasons, battleLog, keyFactors);
  scoreA = godTierScores.scoreA;
  scoreB = godTierScores.scoreB;

  const satireResult = resolveSatireForceBattle(characterA, characterB, scoreA, scoreB, reasons, battleLog, keyFactors);
  if (satireResult) return satireResult;

  const endgameScores = applyEndgameCanonOverrides(characterA, characterB, scoreA, scoreB, reasons, battleLog, keyFactors);
  scoreA = endgameScores.scoreA;
  scoreB = endgameScores.scoreB;

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
