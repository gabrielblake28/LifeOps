import axios, { AxiosInstance } from 'axios';
import { IEpicApi } from '../def/IEpicApi';
import { CreateEpicPayload, Epic } from 'Types/Epic';

export class EpicApi implements IEpicApi {
  private readonly query: AxiosInstance;
  constructor() {
    this.query = axios.create({
      baseURL: 'http://localhost:4000'
    });
  }

  async createEpic(payload: CreateEpicPayload): Promise<string> {
    return await this.query.post('/epics', payload);
  }
  async getEpicbyId(id: string, user_id: string): Promise<Epic> {
    console.log(id);
    const result = await (await this.query.get(`/epics/${user_id}/${id}`)).data;
    return result.data;
  }
  async getAllEpics(user_id: string): Promise<Epic[]> {
    const result = await (await this.query.get(`/epics/${user_id}`)).data;
    return result.data;
  }
  async updateEpic(payload: Epic): Promise<string> {
    return await this.query.put(`/epics/${payload.id}`, payload);
  }
  async deleteEpic(id: string): Promise<void> {
    await this.query.delete(`/epics/${id}`);
  }
}
