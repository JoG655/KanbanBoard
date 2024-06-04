import { create } from "zustand";
import { type DragDataType } from "../types/dragDataType";

type DragStoreProps = {
  isDragEnabled: boolean;
  setIsDragEnabled: (isDragEnabled: boolean) => void;

  dragData: DragDataType;
  setDragData: (dragData: DragDataType) => void;
};

export const useDragStore = create<DragStoreProps>((set) => ({
  isDragEnabled: true,
  setIsDragEnabled: (isDragEnabled) => set(() => ({ isDragEnabled })),

  dragData: {
    variant: "task",
    columnId: "",
    columnIndex: NaN,
    taskId: "",
    taskIndex: NaN,
  },
  setDragData: (dragData) => set(() => ({ dragData })),
}));
