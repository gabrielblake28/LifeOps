export interface Task extends CreateTaskPayload {
  id: string;
}

export interface CreateTaskPayload {
  title: string;
  points: number;
  status: string;
  epic_id: string;
  user_id: string;
}

export enum ColumnName {
  NEW = 'new',
  COMMITTED = 'committed',
  ACTIVE = 'active',
  RESOLVED = 'resolved'
}
