# Anime X1: Mesa dos Destinos

Site interativo feito em React, TypeScript e Vite para simular duelos fictícios entre personagens de anime. O usuário escolhe duas cartas, ativa ou não o modo caos e o sistema calcula o resultado usando atributos, poderes, fraquezas, perfis de lore e regras especiais de confronto.

## Funcionalidades

- Seleção manual de dois personagens para o X1.
- Sorteio automático de dois duelistas pelo botão `Aleatório`.
- Filtro de cartas por anime.
- Ranking inicial com as cartas de maior média de atributos.
- Modo `Caos`, que adiciona uma variação aleatória leve ao cálculo.
- Som ritual opcional no início da batalha.
- Resultado com vencedor ou empate, pontuação final, motivos, registro narrativo da batalha e comparação de atributos.
- Suporte a cartas acima da escala comum, marcadas visualmente como `Escala Deus`.

## Tecnologias

- React
- TypeScript
- Vite
- Framer Motion
- Lucide React
- CSS modularizado por arquivos globais do projeto

## Como Rodar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Gere a versão de produção:

```bash
npm run build
```

Visualize o build localmente:

```bash
npm run preview
```

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o Vite em modo desenvolvimento com host `0.0.0.0`. |
| `npm run build` | Executa a checagem TypeScript e gera os arquivos finais em `dist`. |
| `npm run preview` | Serve o build gerado para conferência local. |

## Estrutura do Projeto

```text
src/
  App.tsx
  main.tsx
  types.ts
  data/
    characters.ts
  logic/
    battleEngine.ts
    characterLore.ts
    powerRules.ts
  components/
    Battle/
    CharacterCard/
    Layout/
    UI/
  styles/
    app.css
    global.css
```

## Principais Arquivos

`src/App.tsx`

Componente principal. Controla os estados de seleção das cartas, filtro por anime, modo caos, som, ranking e resultado da batalha.

`src/data/characters.ts`

Base de dados das cartas. Cada personagem possui nome, anime, imagem, título, descrição, raridade, atributos, poderes, traits, fraquezas e regras especiais opcionais.

`src/types.ts`

Define os tipos centrais do projeto: `Character`, `AttributeKey` e `BattleResult`.

`src/logic/battleEngine.ts`

Motor principal de simulação. Calcula pontuação base, aplica modo caos, regras de poder, camada de lore, fases da batalha, confrontos específicos, proteções de escala divina, exceções narrativas e condições de empate.

`src/logic/powerRules.ts`

Regras genéricas baseadas em atributos, poderes e traits. Exemplos: regeneração, anti-magia, selamento, velocidade extrema, Death Note, controle mental, absorção e transformação.

`src/logic/characterLore.ts`

Perfis narrativos dos personagens. Descreve assinatura, condição de vitória, plano defensivo, escala, ritmo, tags, counters e vulnerabilidades. Essa camada ajuda o motor a considerar matchups além dos números.

## Fluxo de Uso

1. O usuário escolhe a primeira carta.
2. O usuário escolhe a segunda carta ou usa o botão `Aleatório`.
3. Opcionalmente ativa `Caos` para inserir variação no placar.
4. Clica em `INICIAR X1`.
5. O app importa dinamicamente o motor de batalha e executa `simulateBattle`.
6. O resultado é exibido com resumo, fatores-chave, motivos, log narrativo e comparação de atributos.

## Como o Cálculo Funciona

O simulador não usa apenas a soma simples dos atributos. A batalha passa por várias camadas:

1. `baseScore`: calcula uma pontuação inicial ponderada pelos 8 atributos.
2. `modo caos`: adiciona uma variação aleatória pequena quando ativado.
3. `applyPowerRules`: aplica bônus e penalidades por traits e poderes.
4. `applyLoreLayer`: compara perfis de lore, counters, vulnerabilidades e escala.
5. `applyBattlePhases`: avalia abertura, controle, finalização e desgaste.
6. `applyMatchupClashes`: aplica regras de matchup mais específicas.
7. `applyGodTierSanityCheck`: impede que hax fraco ou condições suaves vençam personagens de escala divina sem counter adequado.
8. `resolveSatireForceBattle`: trata casos narrativos especiais, como Saitama.
9. `applyEndgameCanonOverrides`: aplica exceções canônicas específicas, como Yuji contra Sukuna.
10. Resultado final: vitória, empate técnico, empate por condição persistente ou empate ritualístico.

## Modelo de Personagem

Exemplo simplificado de carta:

```ts
{
  id: "goku",
  name: "Goku",
  anime: "Dragon Ball",
  image: "https://...",
  title: "O Saiyajin do Limite",
  description: "Um lutador movido por superação constante.",
  rarity: "Mythic",
  attributes: {
    strength: 142,
    speed: 138,
    durability: 132,
    intelligence: 82,
    energy: 145,
    technique: 118,
    hax: 78,
    stamina: 136
  },
  powers: ["Escala Deus", "Ki divino", "Instinto de combate"],
  traits: {
    overwhelmingPower: true,
    extremeSpeed: true,
    transformation: true
  },
  weaknesses: ["Pode prolongar lutas por curiosidade"],
  specialRules: ["Escala Deus: opera em nível planetário ou superior."]
}
```

## Atributos

| Atributo | Uso no simulador |
| --- | --- |
| `strength` | Força física e impacto direto. |
| `speed` | Iniciativa, blitz e capacidade de pressionar antes do preparo rival. |
| `durability` | Resistência a dano e sobrevivência. |
| `intelligence` | Leitura tática, preparo e resistência a truques. |
| `energy` | Poder energético, espiritual, mágico ou sobrenatural. |
| `technique` | Precisão, domínio do kit e capacidade de converter vantagem em dano. |
| `hax` | Regras especiais, manipulação, controle, selamento e condições fora da força bruta. |
| `stamina` | Fôlego em lutas longas e sustentação de transformações. |

Valores até `100` representam a escala comum do simulador. Valores acima disso são tratados como escala superior e aparecem visualmente como `Escala Deus`.

## Como Adicionar um Personagem

1. Abra `src/data/characters.ts`.
2. Adicione um novo objeto seguindo o tipo `Character`.
3. Use um `id` único.
4. Preencha os 8 atributos obrigatórios.
5. Marque as `traits` que representam o kit do personagem.
6. Adicione fraquezas reais para o motor conseguir gerar counters.
7. Se quiser uma camada narrativa mais precisa, adicione também um perfil em `src/logic/characterLore.ts` usando o mesmo `id`.

Se o personagem tiver uma regra muito específica, existem três caminhos:

- `specialRules` em `characters.ts`, para documentação exibida e texto analisado.
- `powerRules.ts`, para regras genéricas que podem valer para vários personagens.
- `battleEngine.ts`, para exceções de matchup ou comportamento muito específico.

## Componentes

| Componente | Responsabilidade |
| --- | --- |
| `BattleArena` | Mostra as duas cartas escolhidas, toggles de caos/som e botão de iniciar batalha. |
| `BattleResult` | Renderiza o resultado final, motivos, log e botão de nova batalha. |
| `AttributeComparison` | Compara os atributos e pontuações finais dos dois personagens. |
| `BattleLog` | Exibe o registro narrativo gerado pelo motor. |
| `CharacterSelector` | Lista cartas, aplica filtro por anime e dispara seleção/sorteio. |
| `CharacterCard` | Renderiza uma carta com imagem, raridade, atributos e poderes. |
| `CharacterStats` | Exibe os atributos de uma carta. |
| `BattleTable` | Estrutura visual principal da mesa. |
| `MysticBackground` | Fundo visual do site. |
| `Button`, `Badge`, `GlowPanel` | Componentes de UI reutilizáveis. |

## Observações de Conteúdo

- As imagens são URLs remotas usadas como placeholders públicos. Para uma versão final, substitua por artes próprias ou assets controlados pelo projeto.
- O simulador é fictício e opinativo. Os resultados dependem das regras implementadas no código, não de uma fonte oficial.
- Alguns personagens usam versões de fim de obra ou regras específicas, descritas nos próprios textos e perfis de lore.

## Manutenção Recomendada

- Ao adicionar uma trait nova em `types.ts`, revise `powerRules.ts` e `battleEngine.ts` para decidir se ela precisa ter impacto mecânico.
- Ao adicionar personagem forte demais, confira se ele precisa de tags de escala em `characterLore.ts`.
- Ao alterar regras de pontuação, teste duelos extremos e duelos equilibrados para evitar vitórias incoerentes.
- Ao trocar imagens, valide carregamento e proporção nos cards compactos e completos.
