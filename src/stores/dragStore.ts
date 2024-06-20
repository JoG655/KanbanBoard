import { type DragType } from "../types/dragType";
import { create } from "zustand";

type DragStoreProps = {
  drag: DragType;
  setDrag: (drag: DragType) => void;

  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;

  isDragEnabled: boolean;
  setIsDragEnabled: (isDragEnabled: boolean) => void;
};

export const useDragStore = create<DragStoreProps>((set) => ({
  drag: {
    variant: "task",
    id: "",
    columnIndex: NaN,
    taskIndex: NaN,
  },
  setDrag: (drag) => set(() => ({ drag: { ...drag } })),

  isDragging: false,
  setIsDragging: (isDragging) => set(() => ({ isDragging })),

  isDragEnabled: true,
  setIsDragEnabled: (isDragEnabled) => set(() => ({ isDragEnabled })),
}));
