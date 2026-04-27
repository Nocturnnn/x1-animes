import type { Character } from "../types";

export type RuleContext = {
  self: Character;
  opponent: Character;
  score: number;
  reasons: string[];
  logs: string[];
  factors: string[];
};

export function applyPowerRules(context: RuleContext): number {
  const { self, opponent, reasons, logs, factors } = context;
  let score = context.score;
  const selfControlScore = self.attributes.intelligence + self.attributes.technique + self.attributes.hax;
  const opponentResistanceScore = opponent.attributes.intelligence + opponent.attributes.technique + opponent.attributes.hax;

  if (self.traits.overwhelmingPower && self.attributes.strength >= 95) {
    score += 18;
    reasons.push(`${self.name} recebe um bonus massivo por poder fisico acima da escala comum.`);
    logs.push(`A mesa range quando ${self.name} pressiona o duelo com forca esmagadora.`);
    factors.push("Forca absurda");
  }

  if (self.traits.extremeSpeed && self.attributes.speed - opponent.attributes.speed >= 12) {
    score += 12;
    reasons.push(`${self.name} conquista iniciativa por velocidade muito superior.`);
    logs.push(`${self.name} age antes que a carta rival complete o proprio selo.`);
    factors.push("Iniciativa por velocidade");
  }

  if (self.traits.regeneration) {
    score += 8 + Math.round(self.attributes.stamina / 20);
    reasons.push(`${self.name} prolonga a luta com regeneracao e resistencia elevada.`);
    factors.push("Regeneracao");
  }

  if (self.traits.immortality && !opponent.traits.sealing && !opponent.traits.antiMagic) {
    score += 11;
    reasons.push(`${self.name} e dificil de finalizar porque ${opponent.name} nao possui um counter direto para imortalidade.`);
    factors.push("Imortalidade sem counter claro");
  }

  if (self.traits.antiMagic && (opponent.attributes.energy >= 85 || opponent.attributes.hax >= 85 || opponent.traits.cursedEnergy)) {
    score += 16;
    reasons.push(`${self.name} reduz parte do impacto sobrenatural de ${opponent.name} com anti-magia.`);
    logs.push(`Runas se apagam ao redor de ${opponent.name}; a anti-magia altera o ritmo do X1.`);
    factors.push("Anti-magia");
  }

  if (self.traits.sealing && self.attributes.technique >= 90 && (opponent.traits.overwhelmingPower || opponent.traits.regeneration)) {
    score += 14;
    reasons.push(`${self.name} tem condicao de selamento contra adversarios mais brutos ou regenerativos.`);
    factors.push("Selamento tecnico");
  }

  if (self.traits.cloneArmy && opponent.attributes.technique < 90) {
    score += 8;
    reasons.push(`${self.name} cria pressao de multiplas linhas, forçando ${opponent.name} a gastar leitura e recursos.`);
    logs.push(`Sombras duplicadas cercam a carta de ${opponent.name}; a mesa passa a contar posicionamento e volume.`);
    factors.push("Multiplas linhas de ataque");
  }

  if (self.attributes.hax >= 92 && self.attributes.technique >= 85) {
    score += 13;
    reasons.push(`${self.name} transforma o duelo em uma disputa de regras, nao apenas de numeros.`);
    logs.push(`A carta de ${self.name} projeta um simbolo impossivel sobre a madeira escura.`);
    factors.push("Hax decisivo");
  }

  if (self.traits.deathNote) {
    const isBlitzed = opponent.traits.extremeSpeed && opponent.attributes.speed - self.attributes.speed >= 55;
    const hasConceptualDefense = opponent.traits.immortality || opponent.traits.realityManipulation || opponent.traits.antiMagic;
    if (isBlitzed) {
      score -= 14;
      reasons.push(`${self.name} precisa de tempo e informacao, mas ${opponent.name} pode pressionar antes da condicao ser montada.`);
      factors.push("Blitz contra preparo");
    } else {
      score += hasConceptualDefense ? 10 : 24;
      reasons.push(`${self.name} ameaca uma vitoria por condicao especial se identificar o alvo e sobreviver aos primeiros instantes.`);
      logs.push(`A pena toca o papel: a mesa testa se ${self.name} consegue transformar informacao em destino.`);
      factors.push("Condicao de nome");
    }
  }

  if (self.traits.mindControl) {
    if (selfControlScore > opponentResistanceScore + 18 && !opponent.traits.antiMagic) {
      score += 16;
      reasons.push(`${self.name} tem vantagem mental suficiente para interferir na decisao de ${opponent.name}.`);
      factors.push("Controle mental");
    } else if (opponent.traits.strategy || opponent.attributes.intelligence >= 90) {
      score += 5;
      reasons.push(`${self.name} ainda pressiona pela mente, mas ${opponent.name} possui leitura para resistir parcialmente.`);
      factors.push("Pressao psicologica");
    }
  }

  if (self.traits.titanForm) {
    const scaleBonus = opponent.attributes.strength < 75 && opponent.attributes.hax < 70 ? 14 : 7;
    score += scaleBonus;
    reasons.push(`${self.name} muda a escala fisica do campo com uma forma gigante e regenerativa.`);
    factors.push("Escala titanica");
  }

  if (self.traits.spiritualPressure && opponent.attributes.energy < 60) {
    score += 8;
    reasons.push(`${self.name} sufoca cartas de baixa energia com presenca espiritual e tecnicas de controle.`);
    factors.push("Pressao espiritual");
  }

  if (self.traits.vampire && !opponent.traits.sealing && !opponent.traits.antiMagic && opponent.attributes.hax < 85) {
    score += 9;
    reasons.push(`${self.name} usa regeneracao vampirica para sobreviver a derrotas que seriam definitivas para cartas comuns.`);
    factors.push("Sobrevivencia vampirica");
  }

  if (self.traits.absorption && (opponent.attributes.energy >= 80 || opponent.attributes.hax >= 80) && !opponent.traits.antiMagic) {
    score += 16;
    reasons.push(`${self.name} pode adaptar ou absorver parte do kit sobrenatural de ${opponent.name}.`);
    logs.push(`A borda da carta de ${self.name} engole faixas de luz vindas de ${opponent.name}.`);
    factors.push("Absorcao adaptativa");
  }

  if (self.traits.strategy && self.attributes.intelligence - opponent.attributes.intelligence >= 10) {
    score += 9;
    reasons.push(`${self.name} encontra linhas de jogo melhores por leitura estrategica.`);
    factors.push("Estrategia superior");
  }

  if (self.traits.transformation) {
    const transformationBonus = self.attributes.stamina >= 85 ? 9 : 6;
    score += transformationBonus;
    logs.push(`${self.name} revela uma camada oculta de poder quando a chama central oscila.`);
    factors.push("Transformacao");
  }

  if (self.attributes.stamina <= 55 && (opponent.traits.regeneration || opponent.attributes.stamina >= 88)) {
    score -= 6;
    reasons.push(`${self.name} perde valor em uma luta prolongada contra a resistencia de ${opponent.name}.`);
    factors.push("Risco de desgaste");
  }

  if (opponent.weaknesses.some((weakness) => weakness.toLowerCase().includes("selamento")) && self.traits.sealing) {
    score += 8;
    reasons.push(`${opponent.name} possui vulnerabilidade narrativa contra selamento preciso.`);
  }

  return score;
}

export function hasUnresolvedReturnCondition(defeated: Character, winner: Character): boolean {
  const bruteForceWinner = winner.traits.overwhelmingPower || winner.attributes.strength > defeated.attributes.strength + 35;
  const lacksCausalAnswer = !winner.traits.realityManipulation && !winner.traits.sealing && !winner.traits.antiMagic;
  return Boolean((defeated.traits.timeLoop || defeated.traits.immortality) && bruteForceWinner && lacksCausalAnswer);
}
