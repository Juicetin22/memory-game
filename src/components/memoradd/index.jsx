import React, { useState, useEffect } from "react";
import './index.scss';
import MemoraddCard from "./MemoraddCard";

const cardNumbers = [
  { "src": "https://img.icons8.com/small/512/000000/1.png", "value": 1 },
  { "src": "https://img.icons8.com/small/512/000000/2.png", "value": 2 },
  { "src": "https://img.icons8.com/small/512/000000/3.png", "value": 3 },
  { "src": "https://img.icons8.com/small/512/000000/4.png", "value": 4 },
  { "src": "https://img.icons8.com/small/512/000000/5.png", "value": 5 },
  { "src": "https://img.icons8.com/small/512/000000/6.png", "value": 6 },
  { "src": "https://img.icons8.com/small/512/000000/7.png", "value": 7 },
  { "src": "https://img.icons8.com/small/512/000000/8.png", "value": 8 }
];

const cardNine = { "src": "https://img.icons8.com/small/512/000000/9.png", "value": 9 }

const MemoraddIndex = () => {
  
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  // shuffle cards and add an id to each card every new game
  const shuffleCards = () => {
    const shuffledCards = [...cardNumbers, ...cardNumbers, ...cardNumbers]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  const displayNumbers = cards.map(card => {
    return (
      <MemoraddCard 
        key={card.id}
        card={card}
      />
    )
  })

  useEffect(() => {
    shuffleCards();
  }, []);
  
  return (
    <>
      <div>HI</div>
      <div className="number-grid">
        {displayNumbers}
        <MemoraddCard key={9} card={cardNine} />
      </div>
    </>
  )
}

export default MemoraddIndex;