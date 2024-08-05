import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 'column-1', title: 'Pendiente', cardIds: ['card-1'] },
  { id: 'column-2', title: 'En Proceso', cardIds: [] },
  { id: 'column-3', title: 'Completado', cardIds: [] },
];

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addColumn: (state, action) => {
      state.push(action.payload);
    },
    editColumn: (state, action) => {
      const { id, title } = action.payload;
      const column = state.find((col) => col.id === id);
      if (column) {
        column.title = title;
      }
    },
    deleteColumn: (state, action) => {
      return state.filter((col) => col.id !== action.payload);
    },
    moveCard: (state, action) => {
      const { cardId, sourceColumnId, destinationColumnId } = action.payload;
      const sourceColumn = state.find((col) => col.id === sourceColumnId);
      const destinationColumn = state.find((col) => col.id === destinationColumnId);

      if (sourceColumn && destinationColumn) {
        sourceColumn.cardIds = sourceColumn.cardIds.filter((id) => id !== cardId);
        destinationColumn.cardIds.push(cardId);
      }
    },
  },
});

export const { addColumn, editColumn, deleteColumn, moveCard } = columnSlice.actions;

export default columnSlice.reducer;
