import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
  hoverLift?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Card
 * Professional shared surface component used across sections.
 * Clean, modern, shadow-free, and fully theme-responsive.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      highlighted = false,
      hoverLift = true,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "relative rounded-2xl border p-6 md:p-8 transition-colors duration-200 ease-out",
          highlighted
            ? "border-violet-600 dark:border-violet-500 bg-white dark:bg-violet-950/20"
            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60",
          hoverLift ? "hover:border-slate-300 dark:hover:border-slate-700" : "",
          className,
        ].join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
