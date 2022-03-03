import React, { useState, useEffect } from "react";
import './index.scss';
import MemoraddCard from "./MemoraddCard";
import { Link } from "react-router-dom";

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
  const [score, setScore] = useState(0);

  // shuffle cards and add an id to each card every new game
  const shuffleCards = () => {
    const shuffledCards = [...cardNumbers, ...cardNumbers, ...cardNumbers]
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card)
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
      <div className="top">
        <Link to="/" className="link"><button className="back-button">← Back</button></Link>
        <h4>Number Memory Game</h4>
        <button onClick={shuffleCards} className="new-game">New Game</button>
      </div>
      <div className="memoradd-grid">
        {displayNumbers}
        <MemoraddCard key={9} card={cardNine} />
      </div>
    </>
  )
}

export default MemoraddIndex;