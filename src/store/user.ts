import { merchantId } from './../api/baseUrl';
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  user: API.UserDetails | null;
  setUser: (user: API.UserDetails) => void;
};



export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: API.UserDetails) => set({ user: user }),
    }),

    {
      name: "user-store", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state: UserStore) => ({
        user: state.user,
      }),
    },
  ),
);
