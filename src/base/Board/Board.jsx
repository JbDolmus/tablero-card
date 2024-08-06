import React from 'react';
import { useSelector } from 'react-redux';
import Column from './components/Column';
import { styled } from "@mui/system";
import { PlusIcon } from '../../icons/General/PlusIcon';

const KanbanBoard = styled('div')({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  margin: '1rem',

  '.btn-add-column': {
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    '&:hover': {
      backgroundColor: '#d0d0d0'
    }
  },

});

const Board = () => {
  const columns = useSelector((state) => state.columns);

  return (
    <><KanbanBoard>
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}

      <div className='btn-group'>
        <button className='btn-add-column'>
          <PlusIcon />
        </button>
      </div>
    </KanbanBoard>
    </>

  );
};

export default Board;
