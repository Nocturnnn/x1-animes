import { memo } from "react";
import type { ReactNode } from "react";

type GlowPanelProps = {
  children: ReactNode;
  className?: string;
};

export const GlowPanel = memo(function GlowPanel({ children, className = "" }: GlowPanelProps) {
  return <section className={`glow-panel ${className}`}>{children}</section>;
});
