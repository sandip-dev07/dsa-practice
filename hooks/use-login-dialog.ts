import { create } from "zustand";
import type { StateCreator } from "zustand";

interface LoginDialogStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useLoginDialog = create<LoginDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
})); 