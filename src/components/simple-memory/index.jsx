import React, { useState, useEffect, useRef } from "react";
import "./index.scss"
import Card from "./Card";
import { Button, Modal, Overlay, Tooltip } from "react-bootstrap";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

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

  const [helpShow, setHelpShow] = useState(false);
  const target = useRef(null);

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

  // reset choices & increase turn; set any true states back to false as needed
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
    setShow(false);
  };

  // compare two selected cards
  useEffect(() => {
    if (choiceTwo) {
      // will only be disabled during duration of the check, don't want to be able to flip card back face down at this time
      setDisabled(true);
      
      // if flipped card 1 is equal to flipped card 2, set match for the matching cards in the cards array to true; else leave the card alone
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

  // start a new game
  useEffect(() => {
    shuffleCards();
  }, []);

  // for the end of the game
  useEffect(() => {
    // if all cards have matched set to true, display the game-end modal
    for (const card of cards) {
      if (!card.matched) {
        return null;
      }
    }
    turns ? handleShow() : handleClose();

  }, [cards]);

  // map each card in the cards array and pass down props to the Card component
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
    <div onClick={() => helpShow ? setHelpShow(false) : null}>
      <div className="top">
        <Link to="/" className="link"><button className="back-button">← Back</button></Link>
        <h4>Matching Memory Game</h4>
        <div>
          <button onClick={shuffleCards} className="new-game">New Game</button>
          <Button variant="outline-info" ref={target} onClick={() => setHelpShow(!show)} className="game-help-button" >
                ?
              </Button>
          <Overlay target={target.current} show={helpShow} placement="left-start" className="instructions">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                How to play:
                <div className="rules">
                  <p>- Flip over two cards at a time and get them to match. Try to get all the pairs to match with the fewest turns possible!</p>
                </div>
              </Tooltip>
            )}
          </Overlay>
        </div>
      </div>
      
      <Modal show={show} onHide={handleClose} className="win" animation={false} >
        <Modal.Header closeButton className="win-header" >
        </Modal.Header>
        <Modal.Body>
          <Confetti width="500"/>
          <h4>Congratulations!</h4>
          <p>You finished in <strong>{turns} turn(s)</strong>.</p>
          <p>Thank you for playing and try again to decrease your turn count! 😊</p>
        </Modal.Body>
      </Modal>

      <div className='matching-card-grid'>
        {displayCards}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default SimpleMemoryIndex;
