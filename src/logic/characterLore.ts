import type { Character } from "../types";

type LoreProfile = {
  signature: string;
  winCondition: string;
  defensivePlan: string;
  scale: "street" | "elite" | "city" | "continental" | "planetary" | "conceptual";
  tempo: "blitz" | "setup" | "attrition" | "balanced";
  tags: string[];
  counters: string[];
  vulnerabilities: string[];
};

type LoreMatchup = {
  scoreDelta: number;
  reasons: string[];
  logs: string[];
  factors: string[];
};

export const loreProfiles: Record<string, LoreProfile> = {
  goku: {
    signature: "ki saiyajin, Ultra Instinct e escalada por transformacoes",
    winCondition: "transformar o duelo em troca direta de velocidade, impacto e resistencia ate superar o teto fisico rival",
    defensivePlan: "aguenta dano absurdo, aprende padroes de luta no corpo a corpo e aumenta o output quando pressionado",
    scale: "planetary",
    tempo: "blitz",
    tags: ["god-tier", "planet-buster", "cosmic-durability", "ki", "martial-arts", "transformation-chain", "flight", "beam", "growth"],
    counters: ["physical-wall", "speed-race", "energy-duel"],
    vulnerabilities: ["conceptual-hax", "mind-trap", "sealing", "overconfidence"],
  },
  naruto: {
    signature: "Modo Sabio dos Seis Caminhos, Kurama completo, clones massivos e poder de selamento",
    winCondition: "saturar o campo com clones, bijuudama rasenshuriken e sensorio divino ate abrir uma rota de selamento ou impacto final",
    defensivePlan: "usa clones como sondas, regeneracao, sensorio Six Paths e stamina absurda para sobreviver a guerras de desgaste",
    scale: "continental",
    tempo: "balanced",
    tags: ["endgame-form", "transcendent-tier", "six-paths", "chakra", "clone-pressure", "sage-sensing", "tailed-beast", "sealing", "team-tactics", "regeneration"],
    counters: ["attrition", "stealth", "single-target-hax", "regeneration", "large-target"],
    vulnerabilities: ["conceptual-erasure", "anti-energy", "mind-trap"],
  },
  luffy: {
    signature: "Gear 5, Haki avancado e liberdade elastica do corpo e ambiente",
    winCondition: "quebrar previsibilidade com criatividade fisica e Haki ate transformar dano em pressao continua",
    defensivePlan: "elasticidade, resistencia absurda e leitura por Haki para sobreviver a trocas prolongadas",
    scale: "continental",
    tempo: "balanced",
    tags: ["rubber-body", "toon-force-lite", "advanced-haki", "future-sight", "blunt-resistance", "transformation-chain"],
    counters: ["blunt-force", "rigid-technique", "fear-pressure"],
    vulnerabilities: ["sealing", "stamina-drain", "mind-trap", "sharp-hax"],
  },
  ichigo: {
    signature: "Bankai verdadeiro, Getsuga final e heranca hibrida Shinigami/Hollow/Quincy",
    winCondition: "usar pressao espiritual transcendente e corte final para atravessar defesas que seriam absolutas em escala menor",
    defensivePlan: "resiste por reiatsu massiva, instinto hibrido e uma forma final feita para enfrentar entidades de topo",
    scale: "continental",
    tempo: "blitz",
    tags: ["endgame-form", "transcendent-tier", "spiritual-pressure", "swordmaster", "beam", "transformation-chain", "hybrid-soul", "soul-targeting"],
    counters: ["low-energy", "spirit-target", "straight-duel", "immortality"],
    vulnerabilities: ["rule-based-hax", "battlefield-control", "mental-layering"],
  },
  gojo: {
    signature: "Limitless, Infinity, Six Eyes e Unlimited Void",
    winCondition: "negar contato com Infinity e finalizar por dominio, Hollow Purple ou sobrecarga de informacao",
    defensivePlan: "filtra ameacas no espaco entre ele e o alvo; so tecnicas anti-Infinity, dominios ou anulacao especializada entram limpas",
    scale: "continental",
    tempo: "setup",
    tags: ["transcendent-tier", "infinity", "space-control", "domain", "information-overload", "reverse-healing", "precision"],
    counters: ["melee-contact", "projectile", "low-hax", "single-target-rush"],
    vulnerabilities: ["anti-technique", "domain-clash", "adaptation", "sealing"],
  },
  sukuna: {
    signature: "Malevolent Shrine, cortes adaptativos, cura reversa e jujutsu de altissima eficiencia",
    winCondition: "abrir dominio sem barreira, cortar em area e adaptar a defesa do inimigo ate achar a fresta fatal",
    defensivePlan: "cura reversa, resistencia de maldicao e leitura cruel de tecnicas rivais",
    scale: "city",
    tempo: "balanced",
    tags: ["endgame-form", "transcendent-tier", "domain", "cleave-dismantle", "area-slash", "reverse-healing", "adaptation", "cursed-energy"],
    counters: ["regeneration", "stationary-defense", "barrier-domain"],
    vulnerabilities: ["anti-energy", "overconfidence", "soul-targeting"],
  },
  gon: {
    signature: "Jajanken, Nen explosivo e voto de potencial extremo",
    winCondition: "aproximar, carregar um golpe limpo e converter emocao em pico brutal de dano",
    defensivePlan: "instinto, resistencia e crescimento em combate, mas com pouca cobertura contra poderes abstratos",
    scale: "elite",
    tempo: "setup",
    tags: ["nen", "charged-strike", "emotional-burst", "sacrifice-form"],
    counters: ["fragile-target", "close-range"],
    vulnerabilities: ["range-control", "hax", "stamina-cost", "experience-gap"],
  },
  killua: {
    signature: "Godspeed, eletricidade e tecnica assassina dos Zoldyck",
    winCondition: "ganhar iniciativa, paralisar o ritmo rival e atacar pontos vitais antes da resposta",
    defensivePlan: "evita dano por reflexo automatico e reposicionamento eletrico",
    scale: "elite",
    tempo: "blitz",
    tags: ["electricity", "assassin", "godspeed", "pressure-points", "stealth"],
    counters: ["slow-caster", "fragile-target", "setup-fighter"],
    vulnerabilities: ["durability-wall", "long-fight", "area-control"],
  },
  subaru: {
    signature: "Return by Death e memoria de rotas fracassadas",
    winCondition: "perder informacao varias vezes ate montar uma rota onde o adversario se entrega ao proprio padrao",
    defensivePlan: "nao defende o primeiro golpe; transforma morte em scouting e manipula o proximo ciclo",
    scale: "continental",
    tempo: "setup",
    tags: ["time-loop", "future-memory", "social-engineering", "low-combat"],
    counters: ["brute-force-only", "predictable-pattern", "no-causal-answer"],
    vulnerabilities: ["causality-null", "sealing", "memory-erasure", "instant-imprisonment"],
  },
  asta: {
    signature: "Anti-Magic, espadas demonicas, ki e corpo treinado sem mana",
    winCondition: "cortar a fonte sobrenatural do rival e transformar magia/hax energetico em luta fisica",
    defensivePlan: "deflete ou apaga magia, e por nao ter mana escapa de varias leituras baseadas em energia",
    scale: "continental",
    tempo: "blitz",
    tags: ["anti-magic", "swordmaster", "ki-sensing", "no-mana", "transformation-chain", "flight"],
    counters: ["magic", "energy-hax", "barrier", "curse"],
    vulnerabilities: ["pure-physical", "non-magic-concept", "range-kiting"],
  },
  saitama: {
    signature: "limiter removido, forca incomensuravel e crescimento absurdo",
    winCondition: "encerrar qualquer confronto fisico com um golpe serio ou escalar acima da copia rival",
    defensivePlan: "quase nada fisico o fere; ele atravessa problemas mecanicos com forca bruta impossivel",
    scale: "planetary",
    tempo: "blitz",
    tags: ["god-tier", "satire-force", "planet-buster", "cosmic-durability", "limitless-growth", "physical-absolute", "gag-force", "space-interaction", "casual-durability"],
    counters: ["physical-wall", "speed-race", "durability-check"],
    vulnerabilities: ["time-loop", "sealing", "mind-trap", "non-combat-objective"],
  },
  levi: {
    signature: "ODM gear, leitura fria e cortes cirurgicos contra alvos grandes",
    winCondition: "usar terreno, angulo e precisao para atacar pontos vitais antes de ser tocado",
    defensivePlan: "sobrevive pela mobilidade, nao por durabilidade sobrenatural",
    scale: "street",
    tempo: "blitz",
    tags: ["gear-mobility", "precision-cut", "anti-giant", "tactical"],
    counters: ["large-target", "low-technique", "terrain-dependent"],
    vulnerabilities: ["area-attack", "flight", "hax", "equipment-loss"],
  },
  vegeta: {
    signature: "ki saiyajin, transformacoes divinas e instinto de duelo",
    winCondition: "pressionar com rajadas, velocidade e orgulho tecnico ate quebrar a defesa rival",
    defensivePlan: "aguenta troca direta e aprende no atrito, mas prefere resolver pela propria superioridade",
    scale: "planetary",
    tempo: "blitz",
    tags: ["god-tier", "planet-buster", "cosmic-durability", "ki", "martial-arts", "beam", "transformation-chain", "pride", "battle-iq"],
    counters: ["physical-wall", "energy-duel", "speed-race"],
    vulnerabilities: ["conceptual-hax", "baiting", "mind-trap"],
  },
  madara: {
    signature: "Rinnegan, Dez-Caudas, Limbo, Susanoo e escala final de guerra shinobi",
    winCondition: "sobrepor clones invisiveis, regeneracao, genjutsu e controle de campo ate o rival ficar sem resposta",
    defensivePlan: "corpo jinchuriki, regeneracao extrema, Limbo e experiencia de guerra para negar abordagens simples",
    scale: "city",
    tempo: "balanced",
    tags: ["endgame-form", "transcendent-tier", "ocular-hax", "limbo", "ten-tails", "clone-pressure", "susanoo", "regeneration", "battlefield-control", "sealing"],
    counters: ["army-pressure", "low-illusion-resist", "brute-force", "single-target-rush"],
    vulnerabilities: ["anti-energy", "arrogance", "conceptual-erasure"],
  },
  itachi: {
    signature: "Tsukuyomi, Amaterasu, Susanoo defensivo e Totsuka",
    winCondition: "vencer antes da luta virar maratona: ilusao, chama negra ou selamento espiritual",
    defensivePlan: "evita trocas longas com leitura antecipada e defesa absoluta momentanea",
    scale: "city",
    tempo: "setup",
    tags: ["ocular-hax", "illusion", "black-flame", "spiritual-sealing", "susanoo", "low-stamina"],
    counters: ["low-mental-resist", "regeneration", "immortality"],
    vulnerabilities: ["attrition", "blind-fight", "high-speed-blitz"],
  },
  light: {
    signature: "Death Note, nome/rosto e manipulacao social",
    winCondition: "sobreviver tempo suficiente para identificar o alvo e escrever uma morte inevitavel",
    defensivePlan: "usa distancia, disfarce e planejamento; no combate aberto quase nao tem defesa",
    scale: "conceptual",
    tempo: "setup",
    tags: ["name-kill", "prep-time", "social-engineering", "human-fragile", "information-win"],
    counters: ["known-identity", "slow-opponent", "low-stealth"],
    vulnerabilities: ["unknown-name", "non-human", "blitz", "mind-reading"],
  },
  eren: {
    signature: "forma tita, regeneracao e pressao de escala",
    winCondition: "mudar o tamanho do campo, esmagar alvos humanos e regenerar enquanto avanca",
    defensivePlan: "corpo titanico absorve dano, mas pontos vitais e mobilidade rival importam muito",
    scale: "city",
    tempo: "attrition",
    tags: ["giant-form", "regeneration", "biological-core", "mass-pressure"],
    counters: ["street-level", "low-mobility", "fear-pressure"],
    vulnerabilities: ["precision-cut", "sealing", "speed", "anti-giant"],
  },
  tanjiro: {
    signature: "Respiracao solar final, marca do cacador, mundo transparente e leitura de abertura",
    winCondition: "ler corpo, ritmo e ponto vital com mundo transparente para encaixar corte solar decisivo",
    defensivePlan: "sobrevive por tecnica corporal refinada, percepcao elevada e resistencia de fim de obra",
    scale: "elite",
    tempo: "balanced",
    tags: ["endgame-form", "swordmaster", "transparent-world", "hunter-mark", "sense-opening", "sun-breathing", "anti-demon", "empathy-read"],
    counters: ["demon", "predictable-pattern", "close-range", "regeneration"],
    vulnerabilities: ["cosmic-scale", "area-hax", "durability-wall"],
  },
  dio: {
    signature: "The World, parada temporal e vampirismo",
    winCondition: "parar o tempo, reposicionar e finalizar antes que o rival entenda a regra",
    defensivePlan: "regeneracao vampirica e evasao temporal, mas depende de janela curta e arrogancia controlada",
    scale: "city",
    tempo: "setup",
    tags: ["time-stop", "vampire", "regeneration", "stand", "mind-games"],
    counters: ["low-awareness", "melee-contact", "fragile-target"],
    vulnerabilities: ["sunlight", "holy-sealing", "long-range-hax", "time-resistance"],
  },
  jotaro: {
    signature: "Star Platinum, precisao extrema e parada temporal curta",
    winCondition: "achar uma janela minima, parar o tempo e aplicar dano perfeitamente localizado",
    defensivePlan: "reacao absurda, durabilidade de Stand e leitura fria sob pressao",
    scale: "city",
    tempo: "blitz",
    tags: ["time-stop", "stand", "precision", "battle-iq", "close-range"],
    counters: ["fragile-target", "short-window", "melee-duel"],
    vulnerabilities: ["range-control", "long-duration-hax", "stamina-cost"],
  },
  makima: {
    signature: "Control Devil, contratos, controle hierarquico e transferencia de dano",
    winCondition: "enquadrar o alvo como inferior, controlar aliados/contratos e vencer por causalidade social",
    defensivePlan: "fatalidades sao desviadas por contrato; informacao remota e proxies reduzem risco direto",
    scale: "conceptual",
    tempo: "setup",
    tags: ["domination", "contract", "damage-transfer", "remote-hearing", "proxy-army", "devil"],
    counters: ["low-will", "social-target", "isolated-target", "unknown-contract"],
    vulnerabilities: ["love-bypass", "anti-contract", "superior-self-image", "erasure"],
  },
  denji: {
    signature: "hibrido motosserra, regeneracao por sangue e caos emocional",
    winCondition: "transformar dano recebido em combustivel e vencer na troca suja de mutilacao e cura",
    defensivePlan: "regenera com sangue e continua lutando mesmo quando a logica tatica quebra",
    scale: "city",
    tempo: "attrition",
    tags: ["hybrid", "chainsaw", "blood-regeneration", "chaos", "close-range"],
    counters: ["fear-entity", "attrition", "flesh-target"],
    vulnerabilities: ["mind-control", "blood-denial", "sealing", "range-control"],
  },
  mob: {
    signature: "poder psiquico percentual, barreiras e explosao emocional",
    winCondition: "conter ate o limite emocional e entao dominar campo, corpos e projeteis por telecinese",
    defensivePlan: "barreiras psiquicas e output crescente quando pressionado emocionalmente",
    scale: "continental",
    tempo: "attrition",
    tags: ["psychic", "barrier", "telekinesis", "emotion-scaling", "nonlethal"],
    counters: ["projectile", "physical-rush", "low-hax"],
    vulnerabilities: ["emotional-restraint", "mind-trap", "anti-psychic"],
  },
  rimuru: {
    signature: "Predator/absorcao, Great Sage/Raphael, adaptacao e magia superior",
    winCondition: "analisar, resistir, absorver e recriar respostas ate o kit rival perder exclusividade",
    defensivePlan: "corpo slime, regeneracao, resistencias e analise automatica contra efeitos novos",
    scale: "conceptual",
    tempo: "attrition",
    tags: ["god-tier", "planet-buster", "conceptual-erasure", "cosmic-durability", "absorption", "analysis-engine", "magic", "regeneration", "copy-adaptation", "barrier"],
    counters: ["energy-hax", "regeneration", "transformation", "long-fight"],
    vulnerabilities: ["anti-magic", "conceptual-stalemate", "instant-sealing"],
  },
  sasuke: {
    signature: "Sharingan/Rinnegan, Amenotejikara, Chidori e Susanoo",
    winCondition: "trocar posicoes, cortar angulos mortos e finalizar com genjutsu, raio ou selamento",
    defensivePlan: "percepcao ocular, Susanoo e teleporte curto para negar ataques lineares",
    scale: "continental",
    tempo: "blitz",
    tags: ["transcendent-tier", "ocular-hax", "space-swap", "lightning", "susanoo", "sealing", "battle-iq"],
    counters: ["linear-rush", "low-illusion-resist", "projectile"],
    vulnerabilities: ["stamina-drain", "anti-energy", "overcommitment"],
  },
  kakashi: {
    signature: "Sharingan, Raikiri, copias de jutsu e leitura tatica",
    winCondition: "identificar o padrao, copiar/responder e usar um golpe preciso em ponto vital",
    defensivePlan: "evita confronto de escala por fintas, substituicao, clones e posicionamento",
    scale: "city",
    tempo: "setup",
    tags: ["copy-technique", "lightning", "battle-iq", "stealth", "precision"],
    counters: ["predictable-pattern", "low-iq-brute", "single-technique"],
    vulnerabilities: ["chakra-drain", "planetary-scale", "overwhelming-hax"],
  },
  zoro: {
    signature: "Santoryu, Haki e resistencia monstruosa",
    winCondition: "aguentar o pior golpe, cortar atraves da defesa e vencer em duelo de vontade",
    defensivePlan: "tanqueia dor e usa Haki para manter pressao contra oponentes mais estranhos",
    scale: "continental",
    tempo: "balanced",
    tags: ["swordmaster", "advanced-haki", "willpower", "durability", "close-range"],
    counters: ["fear-pressure", "blade-duel", "durability-check"],
    vulnerabilities: ["mind-control", "space-control", "range-kiting"],
  },
  "trafalgar-law": {
    signature: "Ope Ope no Mi, Room e cirurgia espacial",
    winCondition: "colocar o rival dentro da Room e reescrever distancia, orgaos, armas e posicionamento",
    defensivePlan: "mantem controle do campo, troca posicoes e evita luta limpa de forca",
    scale: "conceptual",
    tempo: "setup",
    tags: ["space-control", "room", "surgical-hax", "teleport", "battle-iq", "stamina-cost"],
    counters: ["large-target", "low-hax", "predictable-melee"],
    vulnerabilities: ["stamina-drain", "anti-energy", "speed-blitz-before-room"],
  },
  aizen: {
    signature: "Kyoka Suigetsu, hipnose completa, Hogyoku e pressao espiritual",
    winCondition: "fazer o oponente lutar contra uma leitura falsa ate a finalizacao ja ter acontecido",
    defensivePlan: "imortalidade/adaptacao do Hogyoku e controle sensorial que reduz a confiabilidade do rival",
    scale: "conceptual",
    tempo: "setup",
    tags: ["transcendent-tier", "complete-hypnosis", "spiritual-pressure", "immortality", "adaptation", "battle-iq", "illusion"],
    counters: ["senses", "low-energy", "predictable-pattern", "mental-gap"],
    vulnerabilities: ["sealed-state", "anti-illusion", "overconfidence"],
  },
  kenpachi: {
    signature: "forca espiritual crua, prazer de duelo e corte sem sutileza",
    winCondition: "forcar uma troca direta onde defesa, medo e tecnica refinada cedem ao poder bruto",
    defensivePlan: "aguenta ferimentos graves e fica mais perigoso quanto mais a luta parece divertida",
    scale: "continental",
    tempo: "attrition",
    tags: ["spiritual-pressure", "physical-absolute", "swordmaster", "battle-lust", "durability"],
    counters: ["fear-pressure", "durability-check", "low-energy"],
    vulnerabilities: ["mind-trap", "sealing", "range-control", "trickery"],
  },
  yuji: {
    signature: "fim de manga com golpes na alma, Black Flash consecutivo, sangue amaldicoado e resistencia anti-Sukuna",
    winCondition: "atingir a alma e a fronteira entre hospedeiro/maldicao, reduzindo regeneracao e estabilidade de Sukuna",
    defensivePlan: "aguenta dominio, cortes e dano prolongado por resistencia fisica, foco e recuperacao amaldicoada",
    scale: "conceptual",
    tempo: "balanced",
    tags: ["endgame-form", "sukuna-counter", "cursed-energy", "martial-arts", "black-flash-chain", "blood-manipulation", "close-range", "soul-awareness", "soul-targeting", "curse"],
    counters: ["fragile-target", "melee-duel", "curse", "regeneration", "reverse-healing", "cursed-energy"],
    vulnerabilities: ["range-control", "space-control", "complete-domain-lock"],
  },
  toji: {
    signature: "Restricao Celestial, zero energia amaldicoada e arsenal anti-feiticeiro",
    winCondition: "sumir da leitura energetica, entrar no ponto cego e matar antes da tecnica estabilizar",
    defensivePlan: "velocidade fisica, furtividade e ferramentas especializadas substituem defesa sobrenatural",
    scale: "city",
    tempo: "blitz",
    tags: ["no-energy", "stealth", "anti-technique-tool", "assassin", "physical-absolute"],
    counters: ["energy-sensing", "caster", "overconfident-hax"],
    vulnerabilities: ["wide-area-domain", "attrition", "tool-dependence"],
  },
  meruem: {
    signature: "rei quimera, intelecto monstruoso e evolucao por aprendizado",
    winCondition: "sobreviver aos primeiros padroes e superar o adversario por analise e pressao fisica",
    defensivePlan: "durabilidade extrema e mente estrategica reduzem truques repetidos",
    scale: "continental",
    tempo: "attrition",
    tags: ["adaptive-learning", "physical-absolute", "battle-iq", "aura", "durability"],
    counters: ["predictable-pattern", "melee-duel", "low-hax"],
    vulnerabilities: ["poison", "conceptual-hax", "sealing"],
  },
  hisoka: {
    signature: "Bungee Gum, blefe e armadilhas elasticas de Nen",
    winCondition: "fazer o rival errar uma leitura simples e converter elasticidade invisivel em checkmate",
    defensivePlan: "reposicionamento, truque e improviso; evita vencer por escala direta",
    scale: "elite",
    tempo: "setup",
    tags: ["nen", "trap", "elastic-control", "mind-games", "close-range"],
    counters: ["predictable-pattern", "fragile-target", "overconfident-brute"],
    vulnerabilities: ["area-control", "durability-wall", "speed-blitz"],
  },
  deku: {
    signature: "One For All, analise, Blackwhip, Fa Jin e multiplas individualidades",
    winCondition: "combinar trajetoria, acumulacao de energia e leitura para um smash acima do esperado",
    defensivePlan: "mobilidade, captura por Blackwhip e analise para reduzir dano antes do golpe final",
    scale: "city",
    tempo: "balanced",
    tags: ["super-strength", "mobility", "analysis", "binding", "stored-power", "self-damage"],
    counters: ["physical-duel", "large-target", "predictable-pattern"],
    vulnerabilities: ["mind-control", "body-cost", "conceptual-hax"],
  },
  "all-might": {
    signature: "One For All em estado simbolico, velocidade explosiva e golpes de ar",
    winCondition: "resolver rapido com impacto heroico antes que hax complexo tenha tempo de se montar",
    defensivePlan: "corpo treinado e moral inabalavel, mas com limite de tempo dependendo da fase",
    scale: "city",
    tempo: "blitz",
    tags: ["super-strength", "shockwave", "heroic-will", "time-limit", "physical-absolute"],
    counters: ["fragile-target", "fear-pressure", "low-durability"],
    vulnerabilities: ["time-limit", "conceptual-hax", "attrition"],
  },
  "edward-elric": {
    signature: "alquimia sem circulo, automail e transmutacao criativa do terreno",
    winCondition: "entender a composicao do campo e converter ambiente em prisao, arma ou contra-medida",
    defensivePlan: "mobilidade humana, escudos improvisados e criatividade sob pressao",
    scale: "elite",
    tempo: "setup",
    tags: ["alchemy", "battle-iq", "terrain-control", "metal-arm", "binding"],
    counters: ["environment-dependent", "predictable-pattern", "human-scale"],
    vulnerabilities: ["speed-blitz", "unknown-matter", "overwhelming-scale"],
  },
  alucard: {
    signature: "vampirismo, familiares, regeneracao quase absurda e estoque de almas",
    winCondition: "esgotar a capacidade do inimigo de finalizar e devolver a luta como terror de desgaste",
    defensivePlan: "regenera de mutilacoes extremas e pode soltar restricoes para mudar a escala da ameaca",
    scale: "conceptual",
    tempo: "attrition",
    tags: ["vampire", "soul-stock", "regeneration", "familiar-army", "immortality", "blood"],
    counters: ["normal-damage", "fear-pressure", "attrition"],
    vulnerabilities: ["holy-sealing", "soul-erasure", "sunlight", "anti-regeneration"],
  },
  frieren: {
    signature: "seculos de magia, Zoltraak, barreiras e analise anti-demonio",
    winCondition: "identificar a natureza da magia rival e responder com eficiencia fria depois de esconder output",
    defensivePlan: "barreiras, distancia e paciencia; prefere entender antes de gastar poder real",
    scale: "continental",
    tempo: "setup",
    tags: ["magic", "zoltraak", "barrier", "long-experience", "anti-demon", "mana-suppression"],
    counters: ["demon", "magic", "caster", "predictable-spell"],
    vulnerabilities: ["speed-blitz", "anti-magic", "physical-rush"],
  },
  lelouch: {
    signature: "Geass de comando absoluto e estrategia militar",
    winCondition: "criar uma linha de visao e dar uma ordem que transforma o oponente em peca do plano",
    defensivePlan: "vence por preparo, distancia e informacao; se encurralado fisicamente, cai rapido",
    scale: "conceptual",
    tempo: "setup",
    tags: ["absolute-command", "eye-contact", "strategy", "human-fragile", "prep-time"],
    counters: ["known-identity", "low-mental-resist", "social-target"],
    vulnerabilities: ["blitz", "no-eye-contact", "non-human-resistance", "area-attack"],
  },
  guts: {
    signature: "Dragon Slayer, Berserker Armor e vontade contra entidades apostolicas",
    winCondition: "aguentar o impossivel tempo suficiente para acertar um golpe que corta mais que carne",
    defensivePlan: "armadura ignora autopreservacao e a vontade impede medo de virar derrota imediata",
    scale: "elite",
    tempo: "attrition",
    tags: ["swordmaster", "berserker-armor", "willpower", "anti-demon", "pain-tolerance"],
    counters: ["fear-pressure", "demon", "close-range"],
    vulnerabilities: ["body-cost", "magic-hax", "range-control"],
  },
};

function overlap(a: string[], b: string[]): string[] {
  return a.filter((item) => b.includes(item));
}

function scaleValue(scale: LoreProfile["scale"]): number {
  const values = { street: 1, elite: 2, city: 3, continental: 4, conceptual: 4.4, planetary: 5 };
  return values[scale];
}

export function isGodTier(profile: LoreProfile): boolean {
  return profile.tags.includes("god-tier") || profile.tags.includes("planet-buster") || profile.tags.includes("cosmic-durability");
}

export function isSatireForce(profile: LoreProfile): boolean {
  return profile.tags.includes("satire-force");
}

export function isTranscendentTier(profile: LoreProfile): boolean {
  return profile.tags.includes("transcendent-tier");
}

export function hasTrueScaleBreaker(profile: LoreProfile): boolean {
  return (
    profile.tags.includes("conceptual-erasure") ||
    profile.tags.includes("instant-sealing") ||
    profile.tags.includes("time-loop") ||
    profile.tags.includes("causality-null") ||
    profile.tags.includes("soul-erasure")
  );
}

export function reliesOnSoftWinCondition(profile: LoreProfile): boolean {
  return profile.tags.some((tag) =>
    ["domination", "contract", "social-engineering", "absolute-command", "name-kill", "mind-games", "prep-time", "damage-transfer", "immortality", "time-stop", "complete-hypnosis"].includes(tag),
  );
}

export function getLoreProfile(character: Character): LoreProfile | undefined {
  return loreProfiles[character.id];
}

export function analyzeLoreMatchup(self: Character, opponent: Character): LoreMatchup {
  const selfLore = getLoreProfile(self);
  const opponentLore = getLoreProfile(opponent);
  if (!selfLore || !opponentLore) return { scoreDelta: 0, reasons: [], logs: [], factors: [] };

  let scoreDelta = 0;
  const reasons: string[] = [];
  const logs: string[] = [];
  const factors: string[] = [];
  const directCounters = overlap(selfLore.counters, opponentLore.tags);
  const exploitedWeaknesses = overlap(selfLore.tags, opponentLore.vulnerabilities);
  const opponentCounters = overlap(opponentLore.counters, selfLore.tags);
  const scaleGap = scaleValue(selfLore.scale) - scaleValue(opponentLore.scale);
  const selfIsGodTier = isGodTier(selfLore);
  const opponentIsGodTier = isGodTier(opponentLore);
  const selfHasScaleBreaker = hasTrueScaleBreaker(selfLore);
  const opponentHasScaleBreaker = hasTrueScaleBreaker(opponentLore);

  if (directCounters.length > 0) {
    const bonus = Math.min(14, 6 + directCounters.length * 3);
    scoreDelta += bonus;
    reasons.push(`${self.name} tem respostas de lore contra ${opponent.name}: ${directCounters.join(", ")}.`);
    factors.push(`${self.name}: counter de kit`);
  }

  if (exploitedWeaknesses.length > 0) {
    const bonus = Math.min(12, 5 + exploitedWeaknesses.length * 3);
    scoreDelta += bonus;
    reasons.push(`${self.name} explora vulnerabilidades especificas de ${opponent.name}: ${exploitedWeaknesses.join(", ")}.`);
    factors.push(`${self.name}: explora fraqueza`);
  }

  if (opponentCounters.length > 0) {
    const penalty = Math.min(10, 4 + opponentCounters.length * 2);
    scoreDelta -= penalty;
    reasons.push(`${self.name} tambem precisa lidar com counters naturais de ${opponent.name}: ${opponentCounters.join(", ")}.`);
    factors.push(`${opponent.name}: counter defensivo`);
  }

  if (selfIsGodTier && !opponentHasScaleBreaker) {
    scoreDelta += 22;
    reasons.push(`${self.name} opera em escala divina/destrutiva; sem selamento absoluto, apagamento conceitual, loop causal ou counter equivalente, ${opponent.name} nao transforma controle ou truque em derrota real.`);
    factors.push("Abismo de escala divina");
  }

  if (selfLore.tags.includes("transcendent-tier") && scaleGap >= 1) {
    scoreDelta += 6;
    reasons.push(`${self.name} esta em um patamar transcendente para o proprio verso, entao o X1 pesa feitos especiais acima de truques comuns.`);
    factors.push("Patamar transcendente");
  }

  if (selfLore.tags.includes("endgame-form")) {
    scoreDelta += 6;
    reasons.push(`${self.name} esta sendo avaliado em versao de fim de obra/manga, com feitos e tecnicas finais em vez da versao limitada do anime.`);
    factors.push("Versao fim de obra");
  }

  if (selfLore.tags.includes("sukuna-counter") && opponent.id === "sukuna") {
    scoreDelta += 28;
    reasons.push(`${self.name} tem matchup especial contra ${opponent.name}: dano na alma, Black Flash em sequencia e resistencia feita para quebrar a estabilidade do Rei das Maldicoes no fim do manga.`);
    factors.push("Counter direto de Sukuna");
  }

  if (selfLore.tags.includes("soul-targeting") && (opponentLore.tags.includes("reverse-healing") || opponentLore.tags.includes("regeneration"))) {
    scoreDelta += 10;
    reasons.push(`${self.name} ataca a alma ou a estrutura essencial, reduzindo o valor de cura/regeneracao de ${opponent.name}.`);
    factors.push("Dano na alma");
  }

  if (opponentIsGodTier && !selfHasScaleBreaker && reliesOnSoftWinCondition(selfLore)) {
    scoreDelta -= 20;
    reasons.push(`${self.name} depende de uma condicao suave como controle, contrato, preparo ou imortalidade parcial, mas isso nao explica como derrubar alguem da escala de ${opponent.name}.`);
    factors.push("Hax insuficiente contra escala divina");
  }

  if (opponentIsGodTier && selfLore.tags.includes("damage-transfer") && !selfHasScaleBreaker) {
    scoreDelta -= 12;
    reasons.push(`${self.name} pode redirecionar dano, mas transferencia de dano nao equivale a vencer alguem capaz de apagar o campo inteiro ou repetir impactos planetarios.`);
    factors.push("Imortalidade parcial nao finaliza");
  }

  if (selfIsGodTier && opponentLore.tags.includes("domination") && !opponentHasScaleBreaker) {
    scoreDelta += 10;
    reasons.push(`${self.name} nao e tratado como alvo comum de submissao: a diferenca de escala e vontade impede que dominacao social resolva o X1 sozinha.`);
    factors.push("Vontade acima de dominacao");
  }

  if (selfLore.tempo === "blitz" && opponentLore.tempo === "setup" && self.attributes.speed >= opponent.attributes.speed + 15) {
    scoreDelta += 9;
    reasons.push(`${self.name} pressiona antes que a condicao principal de ${opponent.name} fique totalmente montada.`);
    factors.push("Blitz contra preparo");
  }

  if (selfLore.tempo === "setup" && opponentLore.tempo === "attrition" && self.attributes.intelligence + self.attributes.hax >= opponent.attributes.intelligence + opponent.attributes.hax + 12) {
    scoreDelta += 8;
    reasons.push(`${self.name} pode transformar a luta longa de ${opponent.name} em uma armadilha planejada.`);
    factors.push("Preparo contra desgaste");
  }

  if (selfLore.tempo === "attrition" && opponentLore.tempo === "blitz" && self.attributes.durability + self.attributes.stamina >= opponent.attributes.strength + opponent.attributes.speed) {
    scoreDelta += 8;
    reasons.push(`${self.name} tem perfil para sobreviver ao primeiro pico de ${opponent.name} e crescer no desgaste.`);
    factors.push("Sobrevive ao blitz");
  }

  if (scaleGap >= 2 && !opponentLore.tags.includes("conceptual-hax") && !opponentLore.tags.includes("time-loop")) {
    scoreDelta += 8;
    reasons.push(`${self.name} luta em uma escala narrativa muito acima de ${opponent.name}, entao o rival precisa de hax real para compensar.`);
    factors.push("Escala superior");
  } else if (scaleGap <= -2 && selfLore.tags.includes("conceptual-hax")) {
    scoreDelta += 6;
    reasons.push(`${self.name} esta abaixo em escala bruta, mas possui uma condicao conceitual que ainda pode roubar o resultado.`);
    factors.push("Hax compensa escala");
  }

  if (selfLore.tags.includes("willpower") && (opponentLore.tags.includes("fear-pressure") || opponentLore.tags.includes("domination"))) {
    scoreDelta += 6;
    reasons.push(`${self.name} tem vontade excepcional, reduzindo efeitos que dependem de medo, inferioridade ou submissao.`);
    factors.push("Vontade contra controle");
  }

  if (selfLore.tags.includes("anti-magic") && (opponentLore.tags.includes("magic") || opponentLore.tags.includes("cursed-energy") || opponentLore.tags.includes("barrier"))) {
    scoreDelta += 12;
    reasons.push(`${self.name} converte parte do kit sobrenatural de ${opponent.name} em uma luta muito mais fisica.`);
    factors.push("Anti-magia aplicada");
  }

  if (selfLore.tags.includes("infinity") && !opponentLore.tags.includes("anti-technique-tool") && !opponentLore.tags.includes("domain") && !opponentLore.tags.includes("space-control")) {
    scoreDelta += 14;
    reasons.push(`${self.name} tem uma defesa de contato que ${opponent.name} nao atravessa de forma limpa pelo proprio kit.`);
    factors.push("Defesa de contato");
  }

  logs.push(`${self.name}: ${selfLore.signature}. Plano de vitoria: ${selfLore.winCondition}.`);
  logs.push(`${opponent.name} tenta responder com ${opponentLore.signature}, entao a mesa compara counters e vulnerabilidades de lore.`);

  return { scoreDelta, reasons, logs, factors };
}
