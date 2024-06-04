import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const THEME_STORE_KEY = "theme";

type ThemeState = "light" | "dark";

type ThemeStoreProps = {
  theme: ThemeState;
  setTheme: (theme: ThemeState) => void;
};

export const useThemeStore = create<ThemeStoreProps>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        setTheme: (theme) => set(() => ({ theme })),
      }),
      {
        name: THEME_STORE_KEY,
      },
    ),
  ),
);
