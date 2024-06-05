import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ModalType =
  | {
      variant: "ColumnAdd";
    }
  | {
      variant: "ColumnEdit";
      columnId: string;
    }
  | {
      variant: "TaskAdd";
      columnId: string;
    }
  | {
      variant: "TaskEdit" | "TaskView";
      columnId: string;
      taskId: string;
    };

type ModalStoreProps = {
  modal: ModalType;
  setModal: (modal: ModalType) => void;

  isOpenColumnAdd: boolean;
  setIsOpenColumnAdd: (isOpenColumnAdd: boolean) => void;

  isOpenColumnEdit: boolean;
  setIsOpenColumnEdit: (isOpenColumnEdit: boolean) => void;

  isOpenTaskAdd: boolean;
  setIsOpenTaskAdd: (isOpenTaskAdd: boolean) => void;

  isOpenTaskEdit: boolean;
  setIsOpenTaskEdit: (isOpenTaskEdit: boolean) => void;

  isOpenTaskView: boolean;
  setIsOpenTaskView: (isOpenTaskView: boolean) => void;
};

export const useModalStore = create<ModalStoreProps>()(
  immer((set) => ({
    modal: { variant: "ColumnAdd" },
    setModal: (modal) =>
      set((state) => {
        switch (modal.variant) {
          case "ColumnAdd":
            state.setIsOpenColumnAdd(true);

            break;
          case "ColumnEdit":
            state.setIsOpenColumnEdit(true);

            break;
          case "TaskAdd":
            state.setIsOpenTaskAdd(true);

            break;
          case "TaskEdit":
            state.setIsOpenTaskEdit(true);

            break;
          case "TaskView":
            state.setIsOpenTaskView(true);

            break;
          default:
            return;
        }

        state.modal = { ...modal };
      }),

    isOpenColumnAdd: false,
    setIsOpenColumnAdd: (isOpenColumnAdd) =>
      set((state) => {
        state.isOpenColumnAdd = isOpenColumnAdd;
      }),

    isOpenColumnEdit: false,
    setIsOpenColumnEdit: (isOpenColumnEdit) =>
      set((state) => {
        state.isOpenColumnEdit = isOpenColumnEdit;
      }),

    isOpenTaskAdd: false,
    setIsOpenTaskAdd: (isOpenTaskAdd) =>
      set((state) => {
        state.isOpenTaskAdd = isOpenTaskAdd;
      }),

    isOpenTaskEdit: false,
    setIsOpenTaskEdit: (isOpenTaskEdit) =>
      set((state) => {
        state.isOpenTaskEdit = isOpenTaskEdit;
      }),

    isOpenTaskView: false,
    setIsOpenTaskView: (isOpenTaskView) =>
      set((state) => {
        state.isOpenTaskView = isOpenTaskView;
      }),
  })),
);
