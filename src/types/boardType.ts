export type BoardSubtaskDataType = {
  title: string;
  isCompleted: boolean;
};

export type BoardSubtaskType = {
  id: string;
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
  createdDate: number;
  dueDate?: number;
  subtasks: BoardSubtaskType[];
};

export type BoardTaskType = {
  id: string;
} & BoardTaskDataType;

export type BoardColumnDataType = {
  title: string;
  tasks: BoardTaskType[];
};

export type BoardColumnType = {
  id: string;
} & BoardColumnDataType;

export type BoardType = BoardColumnType[];

export type BoardSearchKeysType = {
  title: string;
  description: string;
  priority: string;
};

export type BoardIsSearchActiveType = boolean;

export type BoardModalsKeysType = Record<
  keyof BoardColumnDataType | keyof BoardTaskDataType,
  string
>;
