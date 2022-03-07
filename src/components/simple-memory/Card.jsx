import React from "react";
import "./Card.scss";

const SingleCard = (props) => {
  // props passed down from index
  const { card, handleChoice, flipped, disabled } = props;

  // if card is not disabled, call handleChoice function
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className='matching-card'>
      <div className={ flipped ? "flipped" : "" }>
        <img src={card.src} className="front" alt="card front" />
        <img 
          className='back' 
          src="https://img.icons8.com/ios/250/000000/star--v1.png" 
          alt='card back' 
          onClick={handleClick} 
        />
      </div>
    </div>
  )
}

export default SingleCard;