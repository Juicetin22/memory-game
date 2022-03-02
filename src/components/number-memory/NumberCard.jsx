import React from 'react';
import './NumberCard.scss';

const NumberCard = (props) => {
  const { card } = props;

  return (
    <div className='number'>
      <div>
        <img src={card.src} alt="number-front" />
        <img 
          src="https://img.icons8.com/glyph-neue/512/000000/christmas-penguin.png" 
          alt='number-back' 
        />
      </div>
    </div>
  )
}

export default NumberCard;