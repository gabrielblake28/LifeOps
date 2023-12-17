import { create } from 'zustand';
import { CreateEpicPayload, Epic } from 'Types/Epic';
import { EpicApi } from 'Api/Epic/impl/EpicApi';

const epicApi = new EpicApi();
interface EpicStore {
  Epics: Epic[];
  FetchEpics: (user_id: string) => Promise<void>;
  AddEpic: (epicPayload: CreateEpicPayload) => Promise<void>;
  UpdateEpic: (epicPayload: Epic) => Promise<void>;
  DeleteEpic: (id: string) => Promise<void>;
}
export const useEpicStore = create<EpicStore>((set) => ({
  Epics: [],

  FetchEpics: async (user_id: string) => {
    try {
      const result = await epicApi.getAllEpics(user_id);
      set({ Epics: result });
    } catch (error) {
      console.error('Error fetching epics:', error);
    }
  },

  AddEpic: async (epicPayload: CreateEpicPayload) => {
    try {
      // Make API call to add epic to the database
      await epicApi.createEpic(epicPayload);

      // Make API call to get all epics after adding the new one
      const updatedEpics = await epicApi.getAllEpics(epicPayload.user_id);

      // Update store with the fetched list of epics
      set(() => ({ Epics: updatedEpics }));
    } catch (error) {
      console.error('Error adding epic:', error);
    }
  },

  UpdateEpic: async (epicPayload: Epic) => {
    try {
      await epicApi.updateEpic(epicPayload);
      const updatedEpics = await epicApi.getAllEpics(epicPayload.user_id);

      set(() => ({ Epics: updatedEpics }));
    } catch (error) {
      console.error('Error updating epic:', error);
    }
  },

  DeleteEpic: async (id: string) => {
    try {
      // Make API call to delete epic from the database
      await epicApi.deleteEpic(id);

      // Make API call to get all epics after deleting the one
      const updatedEpics = await epicApi.getAllEpics('1');

      // Update store with the fetched list of epics
      set(() => ({ Epics: updatedEpics }));
    } catch (error) {
      console.error('Error deleting epic:', error);
    }
  }
}));
