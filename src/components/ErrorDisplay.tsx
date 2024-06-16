import { ComponentPropsWithoutRef } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { twMerge } from "tailwind-merge";

export type ErrorDisplayProps = { error: string } & Omit<
  ComponentPropsWithoutRef<"p">,
  "children"
>;

export function ErrorDisplay({ error, className, ...rest }: ErrorDisplayProps) {
  const previousError = usePrevious<string>(error);

  return (
    <div
      className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] aria-expanded:grid-rows-[1fr] aria-expanded:opacity-100"
      aria-expanded={!!error}
    >
      <p
        className={twMerge(
          "text-balance text-center text-sm text-red-500",
          className,
          "overflow-hidden",
        )}
        {...rest}
      >
        {error ? error : previousError}
      </p>
    </div>
  );
}
