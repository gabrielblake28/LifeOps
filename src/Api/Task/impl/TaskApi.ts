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
  async getTaskbyId(id: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  async getAllTasks(user_id: string): Promise<Record<string, Task[]>> {
    const result = await (await this.query.get(`/tasks/${user_id}`)).data;
    return result.data;
  }
  async updateTask(id: string, payload: Task): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async deleteTask(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
