import type { ReactNode } from "react";

type BattleTableProps = {
  children: ReactNode;
};

export function BattleTable({ children }: BattleTableProps) {
  return (
    <main className="battle-table">
      <div className="table-ring" aria-hidden="true" />
      <div className="candle candle-left" aria-hidden="true" />
      <div className="candle candle-right" aria-hidden="true" />
      {children}
    </main>
  );
}
