import { create } from "zustand";

type DragControlStoreProps = {
  isDragEnabled: boolean;
  setIsDragEnabled: (isDragEnabled: boolean) => void;
};

export const useDragControlStore = create<DragControlStoreProps>((set) => ({
  isDragEnabled: true,
  setIsDragEnabled: (isDragEnabled) =>
    set(() => ({ isDragEnabled: isDragEnabled })),
}));
