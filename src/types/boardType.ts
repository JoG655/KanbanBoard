export type ColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};

export type TaskType = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: "Very Low" | "Low" | "Medium" | "High" | "Very High";
  subtasks: SubtaskType[];
};

export type SubtaskType = {
  id: string;
  columnId: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
};
