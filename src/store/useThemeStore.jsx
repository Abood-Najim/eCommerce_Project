import { create } from "zustand";

const useThemeStore = create((set) => ({
  mode: localStorage.getItem('themeMode') || 'light',

  toggleMode: () => {
    set((state) => {
      const newMode = state.mode === "light" ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return { mode: newMode };
    });
  }
}))

export default useThemeStore;