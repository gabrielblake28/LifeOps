import { CreateTaskPayload, Task } from 'Types/Task';

export interface ITaskApi {
  createTask(payload: CreateTaskPayload): Promise<Task>;
  getTaskbyId(id: string): Promise<Task>;
  getAllTasks(user_id: string): Promise<Record<string, Task[]>>;
  updateTask(id: string, payload: Task): Promise<string>;
  deleteTask(id: string): Promise<void>;
}
