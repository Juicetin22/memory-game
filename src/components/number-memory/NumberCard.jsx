import React, { useState, useEffect } from "react";
import "./NumberCard.scss";
import ReactCardFlip from "react-card-flip";

const NumberCard = (props) => {
  const { card, value, setValue, setTurn, lives, end } = props;
  
  const [flipped, setFlipped] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);

    if (card.value === value || card.value === value + 1) {
      setOpened(true);
      setValue(card.value);
      setTurn(prev => prev + 1);
    } else {
      setValue(card.value);
      setTurn(prev => prev + 1);
      
      if (lives > 1) {
        setTimeout(() => {
          setFlipped(flipped);
        }, 1500)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setFlipped(!flipped);
    }, 7000);
  }, [])

  useEffect(() => {
    if (end && flipped) {
      setFlipped(!flipped);
    }
  }, [end])


  return (
    <div className={end ? "number end" : "number"}>
      <ReactCardFlip isFlipped={flipped}>
        <img 
          src={card.src} 
          alt="number-front" 
          className={opened ? "opened" : ""}
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