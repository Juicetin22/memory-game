import React, { useState, useEffect } from 'react';
import './MemoraddCard.scss';
import ReactCardFlip from "react-card-flip";

const NumberCard = (props) => {
  const { card, value, reveal, lives, show, transition, setValue, setTurn, setReveal, setTransition } = props;

  const [flipped, setFlipped] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
    setTransition(true);

    // if card flipped has value equal to current value or more by one, set card to open, set current value to the card value and increase turn count (which will trigger useEffect in index)
    // if not, set current value to card value, increase turn count and flip card back face down
    if (card.value === value || card.value === value + 1) {
      setOpened(true);
      setValue(card.value);
      setTurn(prev => prev + 1);
      setTransition(false);
    } else {
      setValue(card.value);
      setTurn(prev => prev + 1);
      
      if (lives > 1 && card.value !== 10) {
        setTimeout(() => {
          setFlipped(flipped);
          setTransition(false);
        }, 1500)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setFlipped(!flipped);
      setTransition(false);
    }, 7000);
  }, [])

  // flip the card if reveal prop is true (which it is when you click 'Show Cards') and card is not front showing; then flip back after set time if game is not over
  useEffect(() => {
    if (reveal && flipped) {
      setFlipped(!flipped);

      if (!show) {
        setTimeout(() => {
          setFlipped(flipped);
          setReveal(false);
        }, 5000);
      }
    }
  }, [reveal])

  return (
    <div className="memoradd">
      <ReactCardFlip isFlipped={flipped}>
        <img 
          src={card.src} 
          alt="memoradd-front" 
          className={opened ? "opened" : ""}
        />
        <img 
          src="https://img.icons8.com/ios/500/000000/duck.png" 
          alt='memoradd-back' 
          onClick={handleFlip}
          className={transition ? "transition" : ""}
        />
      </ReactCardFlip>
    </div>
  )
}

export default NumberCard;