import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AppStore {
  count: number;
  user: { id: string | null; name: string | null; } | null;
  increment: () => void;
  decrement: () => void;
  setUser: (user: { id: string; name: string }) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      count: 0,
      user: null,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      setUser: (user) => set({ user }),
    }),
    { name: 'app-storage', storage: createJSONStorage(() => localStorage) }
  )
);
