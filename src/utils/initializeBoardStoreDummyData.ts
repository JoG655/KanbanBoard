import { getUUID } from "./getUUID";
import { type BoardType } from "../types/boardType";
import { useBoardStore } from "../stores/boardStore";

const DUMMY_DATA_COLUMN_ID = getUUID();

const DUMMY_DATA_TASK_ID = getUUID();

const DUMMY_DATA_SUBTASK_ID = getUUID();

const BOARD_STORE_DUMMY_DATA: BoardType = [
  {
    columnId: DUMMY_DATA_COLUMN_ID,
    title: "To-Do",
    tasks: [
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID,
        title: "Throw the trash",
        description: "The trash can is very far away",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 1,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Throw the trash",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID + 1,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 1,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 1,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 1,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 1,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 1,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID + 2,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 2,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 2,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 2,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 2,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID + 3,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 3,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 3,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 3,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 3,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID + 4,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 4,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 4,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 4,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 4,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID + 5,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 5,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 5,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 5,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 5,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID + 6,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 6,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 6,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 6,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 6,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID + 7,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 7,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 7,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 7,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 7,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID + 8,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 8,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 8,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 8,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 8,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID,
        taskId: DUMMY_DATA_TASK_ID + 9,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 9,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 9,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 9,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID,
            taskId: DUMMY_DATA_TASK_ID + 9,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    columnId: DUMMY_DATA_COLUMN_ID + 1,
    title: "Done",
    tasks: [
      {
        columnId: DUMMY_DATA_COLUMN_ID + 1,
        taskId: DUMMY_DATA_TASK_ID + 2,
        title: "Workout",
        description: "10",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 2,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 2,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 1,
            title: "Walk for 10km",
            isCompleted: true,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 2,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Throw the trash",
            isCompleted: true,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 2,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: true,
          },
        ],
      },
      {
        columnId: DUMMY_DATA_COLUMN_ID + 1,
        taskId: DUMMY_DATA_TASK_ID + 3,
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        subtasks: [
          {
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 3,
            subtaskId: DUMMY_DATA_SUBTASK_ID,
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 3,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 1,
            title: "Walk for 10km",
            isCompleted: true,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 3,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 2,
            title: "Play with other dogs",
            isCompleted: true,
          },
          {
            columnId: DUMMY_DATA_COLUMN_ID + 1,
            taskId: DUMMY_DATA_TASK_ID + 3,
            subtaskId: DUMMY_DATA_SUBTASK_ID + 3,
            title: "Walk back home",
            isCompleted: true,
          },
        ],
      },
    ],
  },
];

export function initializeBoardStoreDummyData() {
  useBoardStore.setState({ board: BOARD_STORE_DUMMY_DATA });
}
