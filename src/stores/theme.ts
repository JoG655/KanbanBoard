import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ThemeState = "light" | "dark";

type ThemeStoreProps = {
  theme: ThemeState;
  setTheme: (value: ThemeState) => void;
};

export const useThemeStore = create<ThemeStoreProps>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        setTheme: (value) => set({ theme: value }),
      }),
      {
        name: "theme",
      },
    ),
  ),
);
