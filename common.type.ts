export type taskInputStateType = {
  title: string;
  category: string;
  date: Date;
  time: Date;
  note: string;
  id: string;
};

export type taskType = taskInputStateType[];
