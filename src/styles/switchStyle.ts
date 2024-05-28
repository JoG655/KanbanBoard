import { cva } from "class-variance-authority";

export const switchStyle = cva(
  [
    "rounded-full",
    "bg-primary-600",
    "text-primary-50",
    "hover:bg-primary-500",
    "active:bg-primary-700",
    "disabled:bg-primary-200",
    "disabled:text-primary-400",

    "after:absolute",
    "after:rounded-full",
    "after:border",
    "after:border-primary-700",
    "after:bg-white",
    "after:transition-all",
    "after:content-['']",
    // peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none

    "justify-center",
    "gap-2",
    "rounded-lg",
    "leading-none",
    "ring-focus",
    "transition",
    "hover:cursor-pointer",
    "focus:outline-none",
    "focus-visible:ring-4",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        sm: ["min-h-9", "p-3", "py-1.5"],
        md: ["min-w-14", "p-1"],
        lg: ["min-h-11", "px-5", "py-2.5"],
        xl: ["min-h-12", "px-6", "py-3"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
