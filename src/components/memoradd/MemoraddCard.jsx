import React, { useState, useEffect } from 'react';
import './MemoraddCard.scss';
import ReactCardFlip from "react-card-flip";

const NumberCard = (props) => {
  // props passed down from index
  const { card, value, reveal, lives, show, transition, setValue, setTurn, setReveal, setTransition } = props;

  // states that alter display of cards
  // state that is used for ReactCardFlip
  const [flipped, setFlipped] = useState(false);
  // when a correct card is flipped, opened state is true, which affect the card's className
  const [opened, setOpened] = useState(false);

  const handleFlip = () => {
    // flip over card that is clicked and prevent other cards from being clicked
    setFlipped(!flipped);
    setTransition(true);
    // set current value to the card value and increase turn count (which will trigger useEffect in index)
    setValue(card.value);
    setTurn(prev => prev + 1);

    // if card flipped has value equal to current value or more by one, set card to open and remove transition period
    // if not, flip card back face down and remove transition period after set time
    if (card.value === value || card.value === value + 1) {
      setOpened(true);
      setTransition(false);
    } else {
      // flip card back face down if user still has lives and the card flipped is not the 0 card
      if (lives > 1 && card.value !== 10) {
        setTimeout(() => {
          setFlipped(flipped);
          setTransition(false);
        }, 1500)
      }
    }
  }

  // game starts with cards face up, flip back down after 7 seconds
  useEffect(() => {
    setTimeout(() => {
      setFlipped(!flipped);
      setTransition(false);
    }, 7000);
  }, [])

  // flip the card if reveal prop is true (which it is when you click 'Show Cards' or when game ends) AND card is face down
  // if game is not over, flip card face down after set time 
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