import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveCard, deleteColumn } from '../../../store/slices/column/columnSlice';
import Card from './Card';
import { styled } from "@mui/system";
import { PlusIcon } from '../../../icons/General/PlusIcon';
import Swal from 'sweetalert2';

const ColumnWrapper = styled('div')({
  background: '#f0f0f0',
  padding: '16px',
  borderRadius: '8px',
  width: '300px',
  position: 'relative',

  '.btn-group': {
    width: '100%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '8px',
    backgroundColor: '#f0f0f0',
    '&:hover': {
      backgroundColor: '#d0d0d0'
    },
    '& .btn-icon': {
      marginRight: '8px'
    }
  },

  '.column-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '.menu-btn': {
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      fontSize: '24px',
      display: 'flex',
      flexDirection: 'row',  
    },

    '.menu': {
      position: 'absolute',
      top: '4.5rem',
      right: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '4px',
      padding: '5px',
      display: 'none',
      zIndex: 1,

      '&.show': {
        display: 'block',
      },

      'button': {
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: '5px 10px',
        textAlign: 'left',
        width: '100%',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        }
      }
    }
  }
});

const Column = ({ column }) => {
  const cards = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const memoizedCards = useMemo(
    () => column.cardIds.map((cardId) => cards.find((card) => card.id === cardId)),
    [cards, column.cardIds]
  );

  const onDrop = (e) => {
    const cardId = e.dataTransfer.getData('text');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    dispatch(moveCard({ cardId, sourceColumnId, destinationColumnId: column.id }));
  };

  const handleDeleteColumn = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteColumn(column.id));
        Swal.fire(
          'Eliminado',
          'La columna ha sido eliminada',
          'success'
        )
      }
    })
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setShowMenu(prev => !prev);
  };

  return (
    <ColumnWrapper onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      <div className="column-header">
        <h2>{column.title}</h2>
        <button className="menu-btn" onClick={handleMenuClick} ref={buttonRef}>⋮</button>
        <div className={`menu ${showMenu ? 'show' : ''}`} ref={menuRef}>
          <button onClick={handleDeleteColumn}>Eliminar columna</button>
        </div>
      </div>
      {memoizedCards.map((card) => (
        <Card key={card.id} card={card} columnId={column.id} />
      ))}
      <div>
        <button className='btn-group' type='button'>
          <span className="btn-icon">
            <PlusIcon className='' />
          </span>
          <span> Agregar Card</span>
        </button>
      </div>
    </ColumnWrapper>
  );
};

export default Column;
