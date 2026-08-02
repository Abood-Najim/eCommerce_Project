import { create } from "zustand";

const useLoginPromptStore = create((set) => ({
  isOpen: false,
  openLoginPrompt: () => set({ isOpen: true }),
  closeLoginPrompt: () => set({ isOpen: false }),
}));

export default useLoginPromptStore;