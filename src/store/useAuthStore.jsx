import { create } from "zustand";

const useAuthStore = create((set) => ({

  token: localStorage.getItem('accessToken'),
  setToken: (newToken) => {
    set({
      token: newToken
    });
    localStorage.setItem('accessToken', newToken);
  },
  logout: () => {
    set({
      token: null
    });
    localStorage.removeItem('accessToken');
  }

}));

export default useAuthStore;
/*anything related to the autherization is going to be added here to easily modify it later*/ 