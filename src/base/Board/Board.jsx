import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from "@mui/system";
import Column from './components/Column';
import { PlusIcon } from '../../icons/General/PlusIcon';
import { addColumn } from '../../store/slices/column/columnSlice';

const KanbanBoard = styled('div')({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  margin: '1rem',

  '.btn-add-column': {
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#d0d0d0'
    },
    '&:hover .tooltip': {
      visibility: 'visible',
      opacity: 1,
    }
  },

  '.tooltip': {
    visibility: 'hidden',
    width: '120px',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '6px',
    padding: '5px 0',
    position: 'absolute',
    zIndex: 1,
    bottom: '125%',
    left: '50%',
    marginLeft: '-60px',
    opacity: 0,
    transition: 'opacity 0.3s',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-5px',
      borderWidth: '5px',
      borderStyle: 'solid',
      borderColor: '#333 transparent transparent transparent',
    }
  },

  '.new-column-form': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.1rem',

    'input': {
      borderRadius: '4px',
      border: '1px solid #ccc',
      padding: '0.5rem',
    },

    '.btn-confirm': {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      padding: '0.5rem',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      marginLeft: '0.2rem',
      cursor: 'pointer',
      borderRadius: '4px',
    },

    '.btn-cancel': {
      backgroundColor: '#f44336',
      border: 'none',
      color: 'white',
      padding: '0.5rem',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '0 0.2rem',
      cursor: 'pointer',
      borderRadius: '4px',
    }
  }
});

const Board = () => {
  const columns = useSelector((state) => state.columns);
  const dispatch = useDispatch();
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const handleAddColumnClick = () => {
    setIsAddingColumn(true);
  };

  const handleConfirmClick = () => {
    if (newColumnTitle.trim()) {
      dispatch(addColumn({ id: `col-${Date.now()}`, title: newColumnTitle, cardIds: [] }));
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };

  const handleCancelClick = () => {
    setNewColumnTitle('');
    setIsAddingColumn(false);
  };

  return (
    <KanbanBoard>
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      <div>
      {isAddingColumn ? (
        <div className="new-column-form">
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="Título de la columna"
          />
          <button className="btn-confirm" onClick={handleConfirmClick}>✔</button>
          <button className="btn-cancel" onClick={handleCancelClick}>✘</button>
        </div>
      ) : (
        <div className='btn-group'>
          <button className='btn-add-column' type='button' onClick={handleAddColumnClick}>
            <PlusIcon />
            <span className="tooltip">Agregar Columna</span>
          </button>
        </div>
      )}
      </div>
    </KanbanBoard>
  );
};

export default Board;
