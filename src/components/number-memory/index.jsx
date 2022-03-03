import React, { useState, useEffect } from "react";
import './index.scss';
import NumberCard from "./NumberCard";

const cardNumbers = [
  { "src": "https://img.icons8.com/small/512/000000/1.png", "value": 1 },
  { "src": "https://img.icons8.com/small/512/000000/2.png", "value": 2 },
  { "src": "https://img.icons8.com/small/512/000000/3.png", "value": 3 },
  { "src": "https://img.icons8.com/small/512/000000/4.png", "value": 4 },
  { "src": "https://img.icons8.com/small/512/000000/5.png", "value": 5 },
  { "src": "https://img.icons8.com/small/512/000000/6.png", "value": 6 },
  { "src": "https://img.icons8.com/small/512/000000/7.png", "value": 7 },
  { "src": "https://img.icons8.com/small/512/000000/8.png", "value": 8 },
  { "src": "https://img.icons8.com/small/512/000000/9.png", "value": 9 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": "" },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": "" },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": "" },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": "" },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": "" },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": "" }
];


const NumberMemoryIndex = () => {
  
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [value, setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);

  // shuffle cards and add an id to each card every new game
  const shuffleCards = () => {
    const shuffledCards = [...cardNumbers]
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    if (value === prevValue + 1) {
      setPrevValue(prev => prev + 1);
    } else {
      console.log("NOT HI");
    }
  }, [value])

  useEffect(() => {
    shuffleCards();
  }, []);

  const displayNumbers = cards.map(card => {
    return (
      <NumberCard 
        key={card.id}
        card={card}
        setValue={setValue}
      />
    )
  })
  
  return (
    <div className="number-game">
      <div>HI</div>
      <div className="number-grid">
        {displayNumbers}
      </div>
    </div>
  )
}

export default NumberMemoryIndex;