import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      user: null,
      access: null,
      isAuth: false,

      login: (user, access) =>
        set({
          user,
          access,
          isAuth: true,
        }),

      logout: () =>
        set({
          user: null,
          access: null,
          isAuth: false,
        }),
    }),
    {
      name: "auth-store",
    }
  )
);

export default authStore;
