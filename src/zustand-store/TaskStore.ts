import { create } from 'zustand';
import { Task, ColumnName, CreateTaskPayload } from '../Types/Task';
import { TaskApi } from 'Api/Task/impl/TaskApi';

const taskApi = new TaskApi();

interface TaskStore {
  Tasks: Record<ColumnName, Task[]>;
  FetchTasks: (user_id: string) => Promise<void>;
  AddTask: (taskPayload: CreateTaskPayload) => Promise<void>;
  GetTaskById: (id: string) => Promise<Task>;
  UpdateTask: (task: Task, newStatus?: ColumnName) => Promise<void>;
  DeleteTask: (id: string) => Promise<void>;
}
export const useTaskStore = create<TaskStore>((set) => ({
  Tasks: {
    new: [],
    committed: [],
    active: [],
    resolved: []
  },
  FetchTasks: async (user_id: string) => {
    const allTasks = await taskApi.getAllTasks(user_id);
    set({ Tasks: allTasks });
  },
  AddTask: async (taskPayload: CreateTaskPayload) => {
    await taskApi.createTask(taskPayload);
    const updatedTasks = await taskApi.getAllTasks('1');
    set(() => ({ Tasks: updatedTasks }));
  },

  GetTaskById: async (id: string) => {
    const task = await taskApi.getTaskbyId(id, '1');

    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }

    return task;
  },

  UpdateTask: async (task: Task, newStatus?: ColumnName) => {
    await taskApi.updateTask({ ...task, status: newStatus ?? task.status });
    const updatedTasks = await taskApi.getAllTasks('1'); // task.user_id
    set(() => ({ Tasks: updatedTasks }));
  },

  DeleteTask: async (id: string) => {
    await taskApi.deleteTask(id);
    const updatedTasks = await taskApi.getAllTasks('1');
    set(() => ({ Tasks: updatedTasks }));
  }
}));
