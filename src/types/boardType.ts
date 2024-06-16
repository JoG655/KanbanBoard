export type BoardSubtaskDataType = {
  title: string;
  isCompleted: boolean;
};

export type BoardSubtaskType = {
  columnId: string;
  taskId: string;
  subtaskId: string;
} & BoardSubtaskDataType;

export type BoardTaskDataPriorityType =
  | "Very low"
  | "Low"
  | "Medium"
  | "High"
  | "Very high";

export type BoardTaskDataType = {
  title: string;
  description: string;
  priority: BoardTaskDataPriorityType;
  subtasks: BoardSubtaskType[];
};

export type BoardTaskType = {
  columnId: string;
  taskId: string;
} & BoardTaskDataType;

export type BoardColumnDataType = {
  title: string;
  tasks: BoardTaskType[];
};

export type BoardColumnType = {
  columnId: string;
} & BoardColumnDataType;

export type BoardType = BoardColumnType[];

export type BoardSearchKeysType = {
  title: string;
  description: string;
  priority: string;
};

export type BoardIsSearchActiveType = boolean;

export type BoardModalsKeysType = {
  title: string;
  description: string;
  priority: string;
};
