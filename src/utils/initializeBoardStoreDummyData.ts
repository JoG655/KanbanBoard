import { getUUID } from "./getUUID";
import { type BoardType } from "../types/boardType";
import { useBoardStore } from "../stores/boardStore";

const TIMESTAMP = Date.now();

const BOARD_STORE_DUMMY_DATA: BoardType = [
  {
    id: getUUID(),
    title: "To-Do",
    tasks: [
      {
        id: getUUID(),
        title: "Throw the trash",
        description: "The trash can is very far away",
        priority: "Low",
        createdDate: TIMESTAMP,
        subtasks: [
          {
            id: getUUID(),
            title: "Get out of the house",
            isCompleted: true,
          },
          {
            id: getUUID(),
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            id: getUUID(),
            title: "Throw the trash",
            isCompleted: false,
          },
          {
            id: getUUID(),
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
      {
        id: getUUID(),
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        createdDate: TIMESTAMP,
        subtasks: [
          {
            id: getUUID(),
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            id: getUUID(),
            title: "Walk for 10km",
            isCompleted: false,
          },
          {
            id: getUUID(),
            title: "Play with other dogs",
            isCompleted: false,
          },
          {
            id: getUUID(),
            title: "Walk back home",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: getUUID(),
    title: "Done",
    tasks: [
      {
        id: getUUID(),
        title: "Workout",
        description: "10",
        priority: "Low",
        createdDate: TIMESTAMP,
        dueDate: TIMESTAMP + 200000,
        subtasks: [
          {
            id: getUUID(),
            title: "Get out of the house",
            isCompleted: true,
          },
          {
            id: getUUID(),
            title: "Walk for 10km",
            isCompleted: true,
          },
          {
            id: getUUID(),
            title: "Throw the trash",
            isCompleted: true,
          },
          {
            id: getUUID(),
            title: "Walk back home",
            isCompleted: true,
          },
        ],
      },
      {
        id: getUUID(),
        title: "Walk the dog",
        description: "The dog is very old",
        priority: "Low",
        createdDate: TIMESTAMP,
        dueDate: TIMESTAMP + 400000,
        subtasks: [
          {
            id: getUUID(),
            title: "Get out of the house",
            isCompleted: true,
          },

          {
            id: getUUID(),
            title: "Walk for 10km",
            isCompleted: true,
          },
          {
            id: getUUID(),
            title: "Play with other dogs",
            isCompleted: true,
          },
          {
            id: getUUID(),
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
