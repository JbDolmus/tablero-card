import { configureStore } from '@reduxjs/toolkit';
import columnSlice from './slices/column/columnSlice';
import cardSlice from './slices/card/cardSlice';

export const store = configureStore({
  reducer: {
    columns: columnSlice,
    cards: cardSlice,
  },
});

export default store;
