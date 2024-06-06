import {
  type BoardColumnDataType,
  type BoardTaskDataType,
} from "../types/boardType";
import { create } from "zustand";

type ModalType = {
  variant: "ColumnAdd" | "ColumnEdit" | "TaskAdd" | "TaskEdit" | "TaskView";
} & (
  | {
      variant: "ColumnAdd";
    }
  | ({
      variant: "ColumnEdit";
      columnId: string;
    } & BoardColumnDataType)
  | {
      variant: "TaskAdd";
      columnId: string;
    }
  | ({
      variant: "TaskEdit" | "TaskView";
      columnId: string;
      taskId: string;
    } & BoardTaskDataType)
);

type ModalStoreProps = {
  modal: ModalType;
  setModal: (modal: ModalType) => void;

  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useModalStore = create<ModalStoreProps>()((set) => ({
  modal: { variant: "ColumnAdd" },
  setModal: (modal) =>
    set(() => ({
      modal: { ...modal },
      isOpen: true,
    })),

  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
}));
