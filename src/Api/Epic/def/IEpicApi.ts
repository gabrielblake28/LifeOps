import { CreateEpicPayload, Epic } from 'Types/Epic';

export interface IEpicApi {
  createEpic(payload: CreateEpicPayload): Promise<string>;
  getEpicbyId(id: string, user_id: string): Promise<Epic>;
  getAllEpics(user_id: string): Promise<Epic[]>;
  updateEpic(payload: Epic): Promise<string>;
  deleteEpic(id: string): Promise<void>;
}
