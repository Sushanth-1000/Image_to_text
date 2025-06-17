import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        error: null,
        setLoading: (loading: boolean) => set({ isLoading: loading }),
        setError: (error: string | null) => set({ error }),
      }),
      {
        name: 'app-storage',
      }
    )
  )
); 