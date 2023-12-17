import { CreateTaskPayload, Task } from 'Types/Task';
import { ITaskApi } from '../def/ITaskApi';
import axios, { AxiosInstance } from 'axios';

export class TaskApi implements ITaskApi {
  private readonly query: AxiosInstance;
  constructor() {
    this.query = axios.create({
      baseURL: 'http://localhost:4000'
    });
  }

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    return await this.query.post('/tasks', payload);
  }
  async getTaskbyId(id: string, user_id: string): Promise<Task> {
    const result = await (await this.query.get(`/tasks/${user_id}/${id}`)).data;
    return result.data;
  }
  async getAllTasks(user_id: string): Promise<Record<string, Task[]>> {
    const result = await (await this.query.get(`/tasks/${user_id}`)).data;
    return result.data;
  }
  async updateTask(payload: Task): Promise<string> {
    return await this.query.put(`/tasks/${payload.id}`, payload);
  }
  async deleteTask(id: string): Promise<void> {
    await this.query.delete(`/tasks/${id}`);
  }
}
