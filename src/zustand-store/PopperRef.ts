import { createRef } from 'react';
import { create } from 'zustand';

interface PopperRefStore {
  taskCardRef: React.RefObject<HTMLDivElement>;
  anchorRef: React.RefObject<HTMLButtonElement>;
}

export const usePopperStore = create<PopperRefStore>((set) => ({
  anchorRef: createRef(),
  taskCardRef: createRef()
}));
