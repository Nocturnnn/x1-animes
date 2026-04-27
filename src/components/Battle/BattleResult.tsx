import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import type { BattleResult as BattleResultType, Character } from "../../types";
import { AttributeComparison } from "./AttributeComparison";
import { BattleLog } from "./BattleLog";
import { Button } from "../UI/Button";
import { Badge } from "../UI/Badge";
import { GlowPanel } from "../UI/GlowPanel";

type BattleResultProps = {
  result: BattleResultType | null;
  characterA: Character | null;
  characterB: Character | null;
  onReset: () => void;
};

export function BattleResult({ result, characterA, characterB, onReset }: BattleResultProps) {
  return (
    <AnimatePresence>
      {result && characterA && characterB && (
        <motion.div
          className={`result-reveal ${result.isDraw ? "is-draw" : "has-winner"}`}
          initial={{ opacity: 0, y: 34, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <GlowPanel className="result-panel">
            <div className="result-heading">
              <Sparkles size={22} />
              <span>{result.isDraw ? "A mesa recusou um unico destino" : "Destino revelado"}</span>
            </div>
            <h2>{result.title}</h2>
            <p>{result.summary}</p>

            <div className="factor-list">
              {result.keyFactors.map((factor, index) => (
                <Badge key={factor} tone={index % 2 === 0 ? "violet" : "ember"}>
                  {factor}
                </Badge>
              ))}
            </div>

            <div className="result-grid">
              <div>
                <h3>Motivos</h3>
                <ul className="reason-list">
                  {result.reasons.slice(0, 7).map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Registro da batalha</h3>
                <BattleLog logs={result.battleLog} />
              </div>
            </div>

            <h3>Comparacao de atributos</h3>
            <AttributeComparison characterA={characterA} characterB={characterB} result={result} />

            <Button type="button" variant="ghost" icon={<RotateCcw size={18} />} onClick={onReset}>
              Nova batalha
            </Button>
          </GlowPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
