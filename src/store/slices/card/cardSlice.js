import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 'card-1', title: 'Expediente 1', imageUrl: 'https://via.placeholder.com/150' },
];

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.push(action.payload);
    },
    editCard: (state, action) => {
      const { id, title, imageUrl } = action.payload;
      const card = state.find((c) => c.id === id);
      if (card) {
        card.title = title;
        card.imageUrl = imageUrl;
      }
    },
    deleteCard: (state, action) => {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCard, editCard, deleteCard } = cardSlice.actions;

export default cardSlice.reducer;
