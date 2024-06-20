import {
  type BoardType,
  type BoardColumnDataType,
  type BoardTaskDataType,
} from "../types/boardType";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getUUID } from "../utils/getUUID";

export const BOARD_STORE_KEY = "board";

function getColumnIndex(id: string) {
  const board = useBoardStore.getState().board;

  const columnIndex = board.findIndex((column) => column.id === id);

  if (columnIndex === -1) {
    console.warn("Column not found");

    return {
      valid: false,
      columnIndex: -1,
    };
  }

  return { valid: true, columnIndex };
}

function getTaskIndex(id: string) {
  const board = useBoardStore.getState().board;

  let taskIndex = -1;

  const columnIndex = board.findIndex((column) =>
    column.tasks.some((task, index) => {
      if (task.id === id) {
        taskIndex = index;
      }

      return task.id === id;
    }),
  );

  if (columnIndex === -1 || taskIndex === -1) {
    console.warn("Task not found");

    return {
      valid: false,
      columnIndex: -1,
      taskIndex: -1,
    };
  }

  return { valid: true, columnIndex, taskIndex };
}

type BoardStoreProps = {
  board: BoardType;

  addColumn: (data: BoardColumnDataType) => void;
  editColumn: (id: string, data: BoardColumnDataType) => void;
  deleteColumn: (id: string) => void;
  moveColumn: (id: string, destinationColumnIndex: number) => void;

  addTask: (id: string, data: BoardTaskDataType) => void;
  editTask: (id: string, data: BoardTaskDataType) => void;
  deleteTask: (id: string) => void;
  moveTask: (
    id: string,
    destinationColumnIndex: number,
    destinationTaskIndex: number,
  ) => void;

  toggleSubtask: (id: string, subtaskIndex: number) => void;
};

export const useBoardStore = create<BoardStoreProps>()(
  persist(
    immer((set) => ({
      board: [],

      addColumn: (data) =>
        set((state) => {
          state.board.push({ id: getUUID(), ...data });
        }),
      editColumn: (id, data) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(id);

          if (!valid) return;

          state.board[columnIndex] = { id, ...data };
        }),
      deleteColumn: (id) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(id);

          if (!valid) return;

          state.board.splice(columnIndex, 1);
        }),
      moveColumn: (id, destinationColumnIndex) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(id);

          if (!valid) return;

          const data = { ...state.board[columnIndex] };

          state.board.splice(columnIndex, 1);

          state.board.splice(destinationColumnIndex, 0, {
            ...data,
          });
        }),

      addTask: (id, data) =>
        set((state) => {
          const { valid, columnIndex } = getColumnIndex(id);

          if (!valid) return;

          state.board[columnIndex].tasks.push({
            id: getUUID(),
            ...data,
          });
        }),
      editTask: (id, data) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getTaskIndex(id);

          if (!valid) return;

          state.board[columnIndex].tasks[taskIndex] = {
            id,
            ...data,
          };
        }),
      deleteTask: (id) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getTaskIndex(id);

          if (!valid) return;

          state.board[columnIndex].tasks.splice(taskIndex, 1);
        }),
      moveTask: (id, destinationColumnIndex, destinationTaskIndex) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getTaskIndex(id);

          if (!valid) return;

          const data = { ...state.board[columnIndex].tasks[taskIndex] };

          state.board[columnIndex].tasks.splice(taskIndex, 1);

          state.board[destinationColumnIndex].tasks.splice(
            destinationTaskIndex,
            0,
            { ...data },
          );
        }),

      toggleSubtask: (id, subtaskIndex) =>
        set((state) => {
          const { valid, columnIndex, taskIndex } = getTaskIndex(id);

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
