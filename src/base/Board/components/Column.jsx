import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveCard } from '../../../store/slices/column/columnSlice';
import Card from './Card';
import { styled } from "@mui/system";

const ColumnWrapper = styled('div')({
  background: '#f0f0f0',
  padding: '16px',
  borderRadius: '8px',
  width: '300px',
});

const Column = ({ column }) => {
  const cards = useSelector((state) => state.cards);

  const memoizedCards = useMemo(
    () => column.cardIds.map((cardId) => cards.find((card) => card.id === cardId)),
    [cards, column.cardIds]
  );

  const dispatch = useDispatch();

  const onDrop = (e) => {
    const cardId = e.dataTransfer.getData('text');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    dispatch(moveCard({ cardId, sourceColumnId, destinationColumnId: column.id }));
  };

  return (
    <ColumnWrapper onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      <h2>{column.title}</h2>
      {memoizedCards.map((card) => (
        <Card key={card.id} card={card} columnId={column.id} />
      ))}
    </ColumnWrapper>
  );
};

export default Column;