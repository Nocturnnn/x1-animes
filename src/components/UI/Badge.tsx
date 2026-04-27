type BadgeProps = {
  children: string;
  tone?: "gold" | "violet" | "blue" | "ember";
};

export function Badge({ children, tone = "gold" }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
