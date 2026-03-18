import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  count: number;
  user: { id: string | null; name: string | null; };
}

const initialState: AppState = { count: 0, user: { id: null, name: null } };

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; },
    setUser: (state, action: PayloadAction<{ id: string; name: string }>) => { state.user = action.payload; },
    clearUser: (state) => { state.user = { id: null, name: null }; },
  },
});

export const { increment, decrement, setUser, clearUser } = appSlice.actions;

export const store = configureStore({
  reducer: { app: appSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
