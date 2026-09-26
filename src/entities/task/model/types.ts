export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
