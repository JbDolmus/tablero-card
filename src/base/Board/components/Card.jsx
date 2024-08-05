import React from 'react';
import { styled } from "@mui/system";

const CardWrapper = styled('div')({
  background: 'white',
  padding: '16px',
  marginBottom: '8px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cursor: 'grab',
  '& img': {
    width: '100%',
    borderRadius: '4px',
  },
});

const Card = ({ card, columnId }) => {
  const onDragStart = (e) => {
    e.dataTransfer.setData('text', card.id);
    e.dataTransfer.setData('sourceColumnId', columnId);
  };

  return (
    <CardWrapper draggable onDragStart={onDragStart}>
      <img src={card.imageUrl} alt={card.title} />
      <p>{card.title}</p>
    </CardWrapper>
  );
};

export default Card;
