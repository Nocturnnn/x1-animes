import { memo } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: "primary" | "ghost";
};

export const Button = memo(function Button({ children, icon, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={`ritual-button ritual-button--${variant} ${className}`} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
});
