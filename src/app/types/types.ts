export type TaskType = {
  id: string;
  title: string;
  description: string;
};

export type ColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};
