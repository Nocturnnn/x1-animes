import { motion } from "framer-motion";

type BattleLogProps = {
  logs: string[];
};

export function BattleLog({ logs }: BattleLogProps) {
  return (
    <ol className="battle-log">
      {logs.map((log, index) => (
        <motion.li
          key={`${log}-${index}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.12 }}
        >
          {log}
        </motion.li>
      ))}
    </ol>
  );
}
