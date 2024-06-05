export type ColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};

export type TaskPriorityType =
  | "Very low"
  | "Low"
  | "Medium"
  | "High"
  | "Very high";

export type TaskType = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: TaskPriorityType;
  subtasks: SubtaskType[];
};

export type SubtaskType = {
  id: string;
  columnId: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
};
