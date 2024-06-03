import { getUUID } from "./getUUID";
import { type ColumnType } from "../types/board";
import { useBoardStore } from "../stores/board";

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
        status: "active",
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
    ],
  },
];

export function initializeBoardStoreDummyData() {
  useBoardStore.setState({ columns: BOARD_STORE_DUMMY_DATA });
}
