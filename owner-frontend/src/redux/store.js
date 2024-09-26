import { configureStore } from '@reduxjs/toolkit';
import ownerReducer from './features/ownerSlice';

export const store = configureStore({
  reducer: {
    owner: ownerReducer,
  },
});
