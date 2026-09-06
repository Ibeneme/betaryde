import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
  lg: "px-8 py-4 text-base md:text-lg",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-tight transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#5B21B6] text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:brightness-110",
  secondary:
    "bg-white text-violet-700 shadow-lg shadow-black/10 hover:bg-violet-50",
  outline:
    "border border-white/15 bg-white/[0.03] text-white backdrop-blur-md hover:bg-white/[0.08] hover:border-white/25",
};

/**
 * Button
 * Shared, reusable CTA button used across every section.
 * - `primary`: gradient-filled, high-emphasis action
 * - `secondary`: solid white, high-emphasis action for colored backgrounds
 * - `outline`: glassy, low-emphasis / secondary action
 */
const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  children,
  ...rest
}) => {
  return (
    <button
      className={[
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;
