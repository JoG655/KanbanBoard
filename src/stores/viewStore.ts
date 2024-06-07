import { create } from "zustand";

type ViewStateType = "columns&tasks" | "columns" | "tasks";

type ViewStoreProps = {
  view: ViewStateType;
  setView: (view: ViewStateType) => void;
};

export const useViewStore = create<ViewStoreProps>((set) => ({
  view: "columns&tasks",
  setView: (view) => set(() => ({ view: view })),
}));
