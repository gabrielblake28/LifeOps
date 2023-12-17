import { createRef } from 'react';
import { create } from 'zustand';

interface PopperRefStore {
  taskCardRef: React.RefObject<HTMLDivElement>;
  taskAnchorRef: React.RefObject<HTMLButtonElement>;
  epicCardRef: React.RefObject<HTMLDivElement>;
  epicAnchorRef: React.RefObject<HTMLButtonElement>;
}

export const usePopperStore = create<PopperRefStore>((set) => ({
  taskAnchorRef: createRef(),
  taskCardRef: createRef(),
  epicAnchorRef: createRef(),
  epicCardRef: createRef()
}));
