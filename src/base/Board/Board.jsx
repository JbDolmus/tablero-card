import React from 'react';
import { useSelector } from 'react-redux';
import Column from './components/Column';
import { styled } from "@mui/system";

const KanbanBoard = styled('div')({
  display: 'flex',
  gap: '16px',
});

const Board = () => {
  const columns = useSelector((state) => state.columns);

  return (
    <KanbanBoard>
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </KanbanBoard>
  );
};

export default Board;
