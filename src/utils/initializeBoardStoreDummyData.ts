import { getUUID } from "./getUUID";
import { type ColumnType } from "../types/boardType";
import { useBoardStore } from "../stores/boardStore";

const DUMMY_DATA_COLUMN_ID = getUUID();

const DUMMY_DATA_TASK_ID = getUUID();

const DUMMY_DATA_SUBTASK_ID = getUUID();

const BOARD_STORE_DUMMY_DATA: ColumnType[] = [
  {
    id: DUMMY_DATA_COLUMN_ID,
    title: "To-Do",
    tasks: [
      {
        id: DUMMY_DATA_TASK_ID,
        columnId: DUMMY_DATA_COLUMN_ID,
        title: "Throw the trash",
        description: "The trash can is very far away",
        priority: "Low",
        subtasks: [
          {
            id: DUMMY_DATA_SUBTASK_ID,
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 1,
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 2,
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID,
            title: "Throw the trash",
            isCompleted: false,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 3,
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        id: DUMMY_DATA_TASK_ID + 1,
        columnId: DUMMY_DATA_COLUMN_ID,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            id: DUMMY_DATA_SUBTASK_ID,
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 1,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            id: DUMMY_DATA_SUBTASK_ID + 1,
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 1,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 2,
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 1,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 3,
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 1,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: DUMMY_DATA_COLUMN_ID + 1,
    title: "Done",
    tasks: [
      {
        id: DUMMY_DATA_TASK_ID + 2,
        columnId: DUMMY_DATA_COLUMN_ID + 1,
        title: "Workout",
        description: "10",
        priority: "Low",
        subtasks: [
          {
            id: DUMMY_DATA_SUBTASK_ID,
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 2,
            title: "Get out of the house",
            isCompleted: true,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 1,
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 2,
            title: "Walk for 10km",
            isCompleted: true,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 2,
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 2,
            title: "Throw the trash",
            isCompleted: true,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 3,
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 2,
            title: "Walk back home",
            isCompleted: true,
          },
        ],
      },
      {
        id: DUMMY_DATA_TASK_ID + 3,
        columnId: DUMMY_DATA_COLUMN_ID + 1,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            id: DUMMY_DATA_SUBTASK_ID,
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 3,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            id: DUMMY_DATA_SUBTASK_ID + 1,
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 3,
            title: "Walk for 10km",
            isCompleted: true,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 2,
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 3,
            title: "Play with other dogs",
            isCompleted: true,
          },
          {
            id: DUMMY_DATA_SUBTASK_ID + 3,
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 3,
            title: "Walk back home",
            isCompleted: true,
          },
        ],
      },
    ],
  },
];

export function initializeBoardStoreDummyData() {
  useBoardStore.setState({ columns: BOARD_STORE_DUMMY_DATA });
}