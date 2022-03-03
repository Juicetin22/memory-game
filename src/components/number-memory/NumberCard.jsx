import React, { useState, useEffect } from 'react';
import './NumberCard.scss';
import ReactCardFlip from 'react-card-flip';

const NumberCard = (props) => {
  const { card, setValue, end } = props;
  
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
    setValue(card.value);
  }

  useEffect(() => {
    setTimeout(() => {
      setFlipped(!flipped);
    }, 7000);
  }, [])


  return (
    <div className={end ? "number end" : "number"}>
      <ReactCardFlip isFlipped={flipped}>
        <img 
          src={card.src} 
          alt="number-front" 
        />
        <img 
          src="https://img.icons8.com/glyph-neue/512/000000/christmas-penguin.png" 
          alt='number-back' 
          onClick={handleFlip}
        />
      </ReactCardFlip>
    </div>
  )
}

export default NumberCard;