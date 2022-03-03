import React, { useState } from 'react';
import './NumberCard.scss';
import ReactCardFlip from 'react-card-flip';

const NumberCard = (props) => {
  const { card, setValue } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setValue(card.value);
  }


  return (
    <div className='number'>
      <ReactCardFlip isFlipped={isFlipped}>
        <img 
          src="https://img.icons8.com/glyph-neue/512/000000/christmas-penguin.png" 
          alt='number-back' 
          onClick={handleFlip}
        />
        <img 
          src={card.src} 
          alt="number-front" 
        />
      </ReactCardFlip>
    </div>
  )
}

export default NumberCard;