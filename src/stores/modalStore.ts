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
      id: string;
    } & BoardColumnDataType)
  | {
      variant: "TaskAdd";
      id: string;
    }
  | ({
      variant: "TaskEdit" | "TaskView";
      id: string;
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
