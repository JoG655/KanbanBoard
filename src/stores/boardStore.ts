import { type BoardType } from "../types/boardType";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getUUID } from "../utils/getUUID";

export const BOARD_STORE_KEY = "board";

function getColumnIndex(columnId: string) {
  const board = useBoardStore.getState().board;

  const columnIndex = board.findIndex((column) => column.id === columnId);

  if (columnIndex === -1) {
    console.warn("Column not found");
  }

  return { valid: columnIndex !== -1, columnIndex };
}

function getColumnAndTaskIndex(columnId: string, taskId: string) {
  const { valid, columnIndex } = getColumnIndex(columnId);

  if (!valid) return { valid, columnIndex, taskIndex: -1 };

  const board = useBoardStore.getState().board;

  const taskIndex = board[columnIndex].tasks.findIndex(
    (task) => task.id === taskId,
  );

  if (taskIndex === -1) {
    console.warn("Task not found");
  }

  return { valid: taskIndex !== -1, columnIndex, taskIndex };
}

function getColumnAndTaskAndSubtaskIndex(
  columnId: string,
  taskId: string,
  subtaskId: string,
) {
  const { valid, columnIndex, taskIndex } = getColumnAndTaskIndex(
    columnId,
    taskId,
  );

  if (!valid) return { valid, columnIndex, taskIndex, subtaskIndex: -1 };

  const board = useBoardStore.getState().board;

  const subtaskIndex = board[columnIndex].tasks[taskIndex].subtasks.findIndex(
    (subtask) => subtask.id === subtaskId,
  );

  if (subtaskIndex === -1) {
    console.warn("Subtask not found");
  }

  return { valid: subtaskIndex !== -1, columnIndex, taskIndex, subtaskIndex };
}

type BoardStoreProps = {
  board: BoardType;

  addColumn: () => void;
  deleteColumn: (columnId: string) => void;
  moveColumn: (columnId: string, destinationColumnIndex: number) => void;

  addTask: (columnId: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  moveTask: (
    columnId: string,
    taskId: string,
    destinationColumnIndex: number,
    destinationTaskIndex: number,
  ) => void;

  toggleSubtask: (columnId: string, taskId: string, subtaskId: string) => void;
};

export const useBoardStore = create<BoardStoreProps>()(
  persist(
    immer((set) => ({
      board: [],

      addColumn: () =>
        set((state) => {
          state.board.push({ id: getUUID(), title: "", tasks: [] });
        }),
      deleteColumn: (columnId) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(columnId);

          if (!valid) return;

          state.board.splice(columnIndex, 1);
        }),
      moveColumn: (columnId, destinationColumnIndex) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(columnId);

          if (!valid) return;

          const data = { ...state.board[columnIndex] };

          state.board.splice(columnIndex, 1);

          state.board.splice(destinationColumnIndex, 0, {
            ...data,
          });
        }),

      addTask: (columnId) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(columnId);

          if (!valid) return;

          state.board[columnIndex].tasks.push({
            id: getUUID(),
            columnId: columnId,
            title: "",
            description: "",
            priority: "Low",
            subtasks: [],
          });
        }),
      /* editTask: (columnId, taskId) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getColumnAndTaskIndex(
            columnId,
            taskId,
          );

          if (!valid) return;

          
        }), */
      deleteTask: (columnId, taskId) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getColumnAndTaskIndex(
            columnId,
            taskId,
          );

          if (!valid) return;

          state.board[columnIndex].tasks.splice(taskIndex, 1);
        }),
      moveTask: (
        columnId,
        taskId,
        destinationColumnIndex,
        destinationTaskIndex,
      ) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getColumnAndTaskIndex(
            columnId,
            taskId,
          );

          if (!valid) return;

          const data = {
            ...state.board[columnIndex].tasks[taskIndex],
            columnId: state.board[destinationColumnIndex].id,
          };

          state.board[columnIndex].tasks.splice(taskIndex, 1);

          state.board[destinationColumnIndex].tasks.splice(
            destinationTaskIndex,
            0,
            { ...data },
          );
        }),

      toggleSubtask: (columnId, taskId, subtaskId) =>
        set((state) => {
          const { valid, columnIndex, taskIndex, subtaskIndex } =
            getColumnAndTaskAndSubtaskIndex(columnId, taskId, subtaskId);

          if (!valid) return;

          const isCompleted =
            state.board[columnIndex].tasks[taskIndex].subtasks[subtaskIndex]
              .isCompleted;

          state.board[columnIndex].tasks[taskIndex].subtasks[
            subtaskIndex
          ].isCompleted = !isCompleted;
        }),
    })),
    {
      name: BOARD_STORE_KEY,
    },
  ),
);
