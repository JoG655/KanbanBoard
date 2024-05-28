import { cva } from "class-variance-authority";

export const inputStyle = cva(
  [
    "rounded-lg",
    "border-2",
    "bg-primary-100",
    "text-primary-800",
    "ring-focus",
    "transition",
    "read-only:cursor-text",
    "read-only:select-all",
    "read-only:bg-primary-200",
    "read-only:text-primary-800",
    "focus:outline-none",
    "focus-visible:ring-2",
    "disabled:cursor-not-allowed",
    "disabled:border-0",
    "disabled:bg-primary-300",
    "disabled:text-primary-800",
    "dark:bg-primary-950",
    "dark:text-primary-50",
    "dark:disabled:bg-primary-600",
    "dark:disabled:text-primary-100",
  ],
  {
    variants: {
      styleVariant: {
        primary: [
          "border-primary-300",
          "hover:border-primary-500",
          "focus:border-primary-700",
          "dark:border-primary-600",
          "dark:hover:border-primary-400",
          "dark:focus:border-primary-200",
        ],
        secondary: [
          "border-secondary-300",
          "hover:border-secondary-500",
          "focus:border-secondary-700",
          "dark:border-secondary-600",
          "dark:hover:border-secondary-400",
          "dark:focus:border-secondary-200",
        ],
      },
      styleSize: {
        sm: ["min-h-9", "px-3", "py-1.5", "text-sm"],
        md: ["min-h-10", "px-5", "py-2", "text-sm"],
        lg: ["min-h-11", "px-5", "py-2.5", "text-md"],
        xl: ["min-h-12", "px-6", "py-3", "text-md"],
      },
    },
    defaultVariants: {
      styleVariant: "primary",
      styleSize: "md",
    },
  },
);

export const labelStyle = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "leading-none",
    "hover:cursor-pointer",
  ],
  {
    variants: {
      styleStack: {
        false: "gap-2",
        true: ["flex-col", "gap-0.5"],
      },
    },
    defaultVariants: {
      styleStack: false,
    },
  },
);
