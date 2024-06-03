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
  status: string;
  subtasks: SubtaskType[];
};

export type SubtaskType = {
  id: string;
  columnId: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
};
