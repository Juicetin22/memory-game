import React, { useState, useEffect, useRef } from "react";
import './index.scss';
import MemoraddCard from "./MemoraddCard";
import { Link } from "react-router-dom";
import { Card, Modal, Button, Overlay, Tooltip } from "react-bootstrap";
import Confetti from "react-confetti";
import classNames from "classnames";

const cardNumbers = [
  { "src": "https://img.icons8.com/small/512/000000/1.png", "value": 1 },
  { "src": "https://img.icons8.com/small/512/000000/2.png", "value": 2 },
  { "src": "https://img.icons8.com/small/512/000000/3.png", "value": 3 },
  { "src": "https://img.icons8.com/small/512/000000/4.png", "value": 4 },
  { "src": "https://img.icons8.com/small/512/000000/5.png", "value": 5 },
  { "src": "https://img.icons8.com/small/512/000000/6.png", "value": 6 },
  { "src": "https://img.icons8.com/small/512/000000/7.png", "value": 7 },
  { "src": "https://img.icons8.com/small/512/000000/8.png", "value": 8 },
  { "src": "https://img.icons8.com/small/512/000000/9.png", "value": 9 }
];

const cardZero = { "src": "https://img.icons8.com/small/512/26e07f/0.png", "value": 10 };

const MemoraddIndex = () => {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [value, setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [score, setScore] = useState(0);
  const [help, setHelp] = useState(2);
  const [reveal, setReveal] = useState(false);
  const [lives, setLives] = useState(3);
  const [transition, setTransition] = useState(true);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [helpShow, setHelpShow] = useState(false);
  const target = useRef(null);

  // shuffle cards and add an id to each card every new game, reset to initial states
  const shuffleCards = () => {
    const shuffledCards = [...cardNumbers, ...cardNumbers, ...cardNumbers, cardZero]
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurn(0);
    setValue(0);
    setPrevValue(0);
    setScore(0);
    setHelp(2);
    setReveal(false);
    setLives(3);
    setTransition(true);
    handleClose();
  };

  // set reveal to pass down to card component; decrease help counter by one
  const showCards = () => {
    setReveal(true);
    setHelp(prev => prev - 1);
  }

  // start the game when app loads
  useEffect(() => {
    shuffleCards();
  }, []);
  
  // if value is the same or one more than previous value, basically continue the game
  useEffect(() => {
    // if value set in component is equal to the previous value or more by one, set previous value to the current value and increase the score
    // if card value is not equal to or more than prevValue by one, lose one life and reset the current value to previous value
    if (value === prevValue || value === prevValue + 1) {
      setPrevValue(value);
      setScore(prev => prev + value); 
    } else {
      setLives(prev => prev - 1);
      setValue(prevValue);
    }
  }, [turn]);

  useEffect(() => {
    // if user has no lives or previous value is 10, the game ends
    // note that we cannot use value instead, because value is always set regardless of clicking sequence, but prevValue is only set when user is correctly clicking the numbers in order
    if (lives === 0 || value === 10) {
      handleShow();
      setReveal(true);
    }
  }, [lives, value])

  const lifeStatus = classNames({ "healthy": lives === 3, "sufficient": lives === 2, "danger": lives <= 1 })

  const displayNumbers = cards.map(card => {
    return (
      <MemoraddCard 
        key={card.id}
        card={card}
        value={value}
        reveal={reveal}
        lives={lives}
        show={show}
        transition={transition}
        setValue={setValue}
        setTurn={setTurn}
        setReveal={setReveal}
        setTransition={setTransition}
      />
    )
  })
  
  return (
    <div onClick={() => helpShow ? setHelpShow(false) : null}>
      <div className="top">
        <Link to="/" className="link"><button className="back-button">← Back</button></Link>
        <h4>Mem<span className="o">0</span>radd</h4>
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
                  <p><strong>Mem0radd</strong> - The purpose of the game is to try to score as many points as possible. Try to remember the placement of the cards, and start the game by flipping over a card with number 1 on it. From there, you can either flip over a card of the same number OR a card with a number that is one greater than the previous card.</p> 
                  <p>Example flipping sequence: Card number 1 - Card number 1 - Card number 2 - Card number 3 - ... Card number 9, and finally Card number 0.</p>
                  <p>Lose one life when you flip over a card that does not follow the numerical pattern. However, the game ends when you flip over the number 0 card at any point in the game!</p>
                </div>
              </Tooltip>
            )}
          </Overlay>
        </div>
      </div>
      <div className="memoradd-body">
        <div className="memoradd-grid">
          {displayNumbers}
        </div>
        <div className="memoradd-right-side">
          <Card className="memoradd-card">
            <Card.Body>
              <p>Current Score: {score} </p>
              <p>Turn: {turn}</p>
              <p>Lives: <span className={lifeStatus}>{lives}</span></p>
            </Card.Body>
          </Card>
          <button onClick={showCards} disabled={reveal || !help || transition} className="show-cards">Show Cards</button>
          <p>Left: <span className={!help && "danger"}>{help}</span></p>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} className="memoradd-result" animation={false} >
        <Modal.Header closeButton className="memoradd-result-header" >
        </Modal.Header>
        <Modal.Body>
          <Confetti width="500"/>
          <p>Nice work!</p>
          <p>Your total score was <strong>{score}</strong>.</p>
          <p>Thanks for playing and feel free to try again! 😊</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default MemoraddIndex;