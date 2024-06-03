import { type ColumnType, type TaskType } from "../types/board";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getUUID } from "../utils/getUUID";

export const BOARD_STORE_KEY = "board";

function getColumnIndex(columns: ColumnType[], columnId: string) {
  const columnIndex = columns.findIndex((column) => column.id === columnId);

  if (columnIndex === -1) {
    console.warn("Column not found");
  }

  return { valid: columnIndex !== -1, columnIndex };
}

function getColumnAndTaskIndex(
  columns: ColumnType[],
  columnId: string,
  taskId: string,
) {
  const { valid, columnIndex } = getColumnIndex(columns, columnId);

  if (!valid) return { valid, columnIndex, taskIndex: -1 };

  const taskIndex = columns[columnIndex].tasks.findIndex(
    (task) => task.id === taskId,
  );

  if (taskIndex === -1) {
    console.warn("Task not found");
  }

  return { valid: taskIndex !== -1, columnIndex, taskIndex };
}

function getColumnAndTaskAndSubtaskIndex(
  columns: ColumnType[],
  columnId: string,
  taskId: string,
  subtaskId: string,
) {
  const { valid, columnIndex, taskIndex } = getColumnAndTaskIndex(
    columns,
    columnId,
    taskId,
  );

  if (!valid) return { valid, columnIndex, taskIndex, subtaskIndex: -1 };

  const subtaskIndex = columns[columnIndex].tasks[taskIndex].subtasks.findIndex(
    (subtask) => subtask.id === subtaskId,
  );

  if (subtaskIndex === -1) {
    console.warn("Subtask not found");
  }

  return { valid: subtaskIndex !== -1, columnIndex, taskIndex, subtaskIndex };
}

type BoardStoreProps = {
  columns: ColumnType[];
  addColumn: () => void;
  deleteColumn: (columnId: string) => void;
  moveColumn: (columnId: string, destinationColumnIndex: number) => void;
  addTask: (columnId: string) => void;
  viewTask: (columnId: string, taskId: string) => void;
  editTask: (columnId: string, taskId: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  moveTask: (
    columnId: string,
    taskId: string,
    destinationColumnIndex: number,
    destinationTaskIndex: number,
  ) => void;
  toggleSubtask: (columnId: string, taskId: string, subtaskId: string) => void;
  scopedTask: TaskType;
  isOpenTaskView: boolean;
  setIsOpenTaskView: (isOpenTaskView: boolean) => void;
  isOpenTaskEdit: boolean;
  setIsOpenTaskEdit: (isOpenTaskEdit: boolean) => void;
};

export const useBoardStore = create<BoardStoreProps>()(
  persist(
    immer((set) => ({
      columns: [],
      addColumn: () =>
        set((state) => {
          state.columns.push({ id: getUUID(), title: "", tasks: [] });
        }),
      deleteColumn: (columnId) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(
            state.columns,
            columnId,
          );

          if (!valid) return;

          state.columns.splice(columnIndex, 1);
        }),
      moveColumn: (columnId, destinationColumnIndex) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(
            state.columns,
            columnId,
          );

          if (!valid) return;

          state.columns.splice(destinationColumnIndex, 0, {
            ...state.columns[columnIndex],
          });

          state.columns.splice(columnIndex, 1);
        }),
      addTask: (columnId) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(
            state.columns,
            columnId,
          );

          if (!valid) return;

          state.columns[columnIndex].tasks.push({
            id: getUUID(),
            columnId: columnId,
            title: "",
            description: "",
            status: "",
            subtasks: [],
          });
        }),
      viewTask: (columnId, taskId) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getColumnAndTaskIndex(
            state.columns,
            columnId,
            taskId,
          );

          if (!valid) return;

          state.scopedTask = state.columns[columnIndex].tasks[taskIndex];

          state.setIsOpenTaskView(true);

          state.setIsOpenTaskEdit(false);
        }),
      editTask: (columnId, taskId) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getColumnAndTaskIndex(
            state.columns,
            columnId,
            taskId,
          );

          if (!valid) return;

          state.scopedTask = state.columns[columnIndex].tasks[taskIndex];

          state.setIsOpenTaskEdit(true);

          state.setIsOpenTaskView(false);
        }),
      deleteTask: (columnId, taskId) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getColumnAndTaskIndex(
            state.columns,
            columnId,
            taskId,
          );

          if (!valid) return;

          state.columns[columnIndex].tasks.splice(taskIndex, 1);
        }),
      moveTask: (
        columnId,
        taskId,
        destinationColumnIndex,
        destinationTaskIndex,
      ) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getColumnAndTaskIndex(
            state.columns,
            columnId,
            taskId,
          );

          if (!valid) return;

          state.columns[destinationColumnIndex].tasks.splice(
            destinationTaskIndex,
            0,
            { ...state.columns[columnIndex].tasks[taskIndex] },
          );

          state.columns[columnIndex].tasks.splice(taskIndex, 1);
        }),
      toggleSubtask: (columnId, taskId, subtaskId) =>
        set((state) => {
          const { valid, columnIndex, taskIndex, subtaskIndex } =
            getColumnAndTaskAndSubtaskIndex(
              state.columns,
              columnId,
              taskId,
              subtaskId,
            );

          if (!valid) return;

          const isCompleted =
            state.columns[columnIndex].tasks[taskIndex].subtasks[subtaskIndex]
              .isCompleted;

          state.columns[columnIndex].tasks[taskIndex].subtasks[
            subtaskIndex
          ].isCompleted = !isCompleted;
        }),
      scopedTask: {
        id: "",
        columnId: "",
        title: "",
        description: "",
        status: "",
        subtasks: [],
      },
      isOpenTaskView: false,
      setIsOpenTaskView: (isOpenTaskView) =>
        set((state) => {
          state.isOpenTaskView = isOpenTaskView;
        }),
      isOpenTaskEdit: false,
      setIsOpenTaskEdit: (isOpenTaskEdit) =>
        set((state) => {
          state.isOpenTaskEdit = isOpenTaskEdit;
        }),
    })),
    {
      name: BOARD_STORE_KEY,
    },
  ),
);
