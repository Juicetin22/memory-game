import React, { useState } from 'react';
import './MemoraddCard.scss';
import ReactCardFlip from "react-card-flip";

const NumberCard = (props) => {
  const { card } = props;

  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  }

  return (
    <div className="memoradd">
      <ReactCardFlip isFlipped={flipped}>
        <img 
          src={card.src} 
          alt="memoradd-front" 
          onClick={handleFlip}
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