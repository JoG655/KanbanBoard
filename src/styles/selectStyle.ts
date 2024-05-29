import { cva } from "class-variance-authority";

export const selectStyle = cva(
  [
    "m-2.5",
    "rounded-lg",
    "border-2",
    "bg-primary-100",
    "text-primary-800",
    "transition",
    "read-only:bg-primary-200",
    "read-only:text-primary-800",
    "focus:outline-none",
    "focus-visible:shadow-focus-sm",
    "disabled:cursor-not-allowed",
    "disabled:border-primary-300",
    "disabled:bg-primary-300",
    "disabled:text-primary-800",
    "dark:bg-primary-950",
    "dark:text-primary-50",
    "dark:disabled:border-primary-600",
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
        sm: ["min-h-8", "px-2", "py-1", "text-sm"],
        md: ["min-h-9", "px-3", "py-1.5", "text-sm"],
        lg: ["min-h-10", "px-4", "py-2", "text-md"],
        xl: ["min-h-11", "px-5", "py-2.5", "text-md"],
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
      styleSize: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-md",
        xl: "text-md",
      },
      styleStack: {
        false: "",
        true: "flex-col",
      },
    },
    defaultVariants: {
      styleSize: "md",
      styleStack: false,
    },
  },
);
