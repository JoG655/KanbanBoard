import { type ReactNode } from "react";
import { motion } from "framer-motion";

export type TransitionSlideProps = {
  children: ReactNode;
};

export function TransitionSlide({ children }: TransitionSlideProps) {
  return (
    <>
      {children}
      <motion.div
        className="fixed left-0 top-0 z-50 h-dvh w-dvw origin-bottom bg-primary-700 dark:bg-primary-400"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.3, ease: "linear" }}
      />
      <motion.div
        className="fixed left-0 top-0 z-50 h-dvh w-dvw origin-top bg-primary-700 dark:bg-primary-400"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.3, ease: "linear" }}
      />
    </>
  );
}
