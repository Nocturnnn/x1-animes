type BattleLogProps = {
  logs: string[];
};

export function BattleLog({ logs }: BattleLogProps) {
  return (
    <ol className="battle-log">
      {logs.map((log, index) => (
        <li key={`${log}-${index}`}>{log}</li>
      ))}
    </ol>
  );
}
