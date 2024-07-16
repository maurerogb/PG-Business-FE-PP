import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  firstName: string;
  lastName: string;
}

type AuthStore = {
  token: string;
  user: User;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      user: { firstName: "", lastName: "" },
      setUser: (user: User) => set({ user: user }),
      setToken: (token: string) => set({ token: token }),
    }),

    {
      name: "auth", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state: AuthStore) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
);
