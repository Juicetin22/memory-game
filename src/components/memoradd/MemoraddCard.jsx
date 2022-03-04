import React, { useState, useEffect } from 'react';
import './MemoraddCard.scss';
import ReactCardFlip from "react-card-flip";

const NumberCard = (props) => {
  const { card, reveal, setValue, setTurn, setReveal } = props;

  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
    setValue(card.value);
    setTurn(prev => prev + 1);
  }

  useEffect(() => {
    setTimeout(() => {
      setFlipped(!flipped);
    }, 1000);
  }, [])

  // flip the card if reveal prop is true and it is not the front; then flip back after set time
  useEffect(() => {
    if (reveal && flipped) {
      setFlipped(!flipped);
      setTimeout(() => {
        setFlipped(flipped);
        setReveal(false);
      }, 3000);
    }
  }, [reveal])

  return (
    <div className="memoradd">
      <ReactCardFlip isFlipped={flipped}>
        <img 
          src={card.src} 
          alt="memoradd-front" 
        />
        <img 
          src="https://img.icons8.com/ios/500/000000/duck.png" 
          alt='memoradd-back' 
          onClick={handleFlip}
        />
      </ReactCardFlip>
    </div>
  )
}

export default NumberCard;