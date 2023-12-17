import { create } from 'zustand';
import { Task, ColumnName, CreateTaskPayload } from '../Types/Task';
import { TaskApi } from 'Api/Task/impl/TaskApi';

const taskApi = new TaskApi();

interface TaskStore {
  Tasks: Record<ColumnName, Task[]>;
  FetchTasks: (user_id: string) => Promise<void>;
  AddTask: (taskPayload: CreateTaskPayload) => Promise<void>;
}
export const useTaskStore = create<TaskStore>((set) => ({
  Tasks: {
    new: [],
    committed: [],
    active: [],
    resolved: []
  },
  FetchTasks: async (user_id: string) => {
    try {
      const allTasks = await taskApi.getAllTasks(user_id);
      set({ Tasks: allTasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },
  AddTask: async (taskPayload: CreateTaskPayload) => {
    try {
      await taskApi.createTask(taskPayload);
      const updatedTasks = await taskApi.getAllTasks('1');
      set(() => ({ Tasks: updatedTasks }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
}));
