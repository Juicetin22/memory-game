import React, { useState, useEffect } from 'react';
import './index.scss'
import Card from './Card';
import { Modal } from 'react-bootstrap';
import Confetti from 'react-confetti';

const cardImages = [
  { "src": "https://img.icons8.com/cotton/512/000000/cat--v4.png", matched: false },
  { "src": "https://img.icons8.com/cotton/512/000000/dog--v2.png", matched: false },
  { "src": "https://img.icons8.com/pastel-glyph/512/000000/pigeon.png", matched: false },
  { "src": "https://img.icons8.com/cotton/512/000000/pigeon--v1.png", matched: false },
  { "src": "https://img.icons8.com/cotton/512/000000/pigeon--v2.png", matched: false },
  { "src": "https://img.icons8.com/cotton/512/000000/pigeon--v3.png", matched: false },
  { "src": "https://img.icons8.com/cotton/512/000000/owl--v2.png", matched: false },
  { "src": "https://img.icons8.com/cotton/512/000000/cow-breed.png", matched: false },
  { "src": "https://img.icons8.com/external-flatart-icons-outline-flatarticons/512/000000/external-duck-spring-flatart-icons-outline-flatarticons.png", matched: false }
];

const SimpleMemoryIndex = () => {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // shuffle cards and add an id to each card every new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    
    // these two are in case there is a choice selected before clicking new game
    setChoiceOne(null);
    setChoiceTwo(null);
    
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

    // can't compare the two cards here b/c setting state is async and
    // this comparison will occur before setting the new state!
  };

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  // compare two selected cards
  useEffect(() => {
    if (choiceTwo) {
      // will only be disabled during duration of the check
      setDisabled(true);
      
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  // useEffect(() => {
  //   for (const card of cards) {
  //     if (!card.matched) {
  //       return null;
  //     }
  //   }
  // }, [cards]);

  const displayCards = cards.map(card => {
    return (
      <Card 
        key={card.id} 
        card={card} 
        handleChoice={handleChoice} 
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
      />
    );
  });

  return (
    <>
      <h1>Simple Memory</h1>
      <button onClick={shuffleCards}>New Game</button>

      <Modal show={show} onHide={handleClose} className="win" animation={false} >
        <Modal.Header closeButton >
        </Modal.Header>
        <Modal.Body>
          <Confetti />
          <h4>Congratulations!</h4>
          <p>You finished in {turns} turns.</p>
          <p>Try to beat your score and thanks for playing!</p>
        </Modal.Body>
      </Modal>

      <div className='card-grid'>
        {displayCards}
      </div>
      <p onClick={handleShow}>Turns: {turns}</p>
    </>
  );
}

export default SimpleMemoryIndex;
