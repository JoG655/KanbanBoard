import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const THEME_STORE_KEY = "theme";

type ThemeStateType = "light" | "dark";

type ThemeStoreProps = {
  theme: ThemeStateType;
  setTheme: (theme: ThemeStateType) => void;
};

export const useThemeStore = create<ThemeStoreProps>()(
  devtools(
    persist(
      (set) => ({
        theme: "dark",
        setTheme: (theme) => set(() => ({ theme })),
      }),
      {
        name: THEME_STORE_KEY,
      },
    ),
  ),
);
