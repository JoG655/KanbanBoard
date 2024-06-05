import { create } from "zustand";
import { type DragType } from "../types/dragType";

type DragStoreProps = {
  drag: DragType;
  setDrag: (drag: DragType) => void;

  isDragEnabled: boolean;
  setIsDragEnabled: (isDragEnabled: boolean) => void;
};

export const useDragStore = create<DragStoreProps>((set) => ({
  drag: {
    variant: "task",
    columnId: "",
    columnIndex: NaN,
    taskId: "",
    taskIndex: NaN,
  },
  setDrag: (drag) => set(() => ({ drag })),

  isDragEnabled: true,
  setIsDragEnabled: (isDragEnabled) => set(() => ({ isDragEnabled })),
}));
