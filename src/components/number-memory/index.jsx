import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import NumberCard from "./NumberCard";
import { Modal, Button, Overlay, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

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
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 100 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 200 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 300 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 400 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 500 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 600 }
];


const NumberMemoryIndex = () => {
  const [cards, setCards] = useState([]);
  const [value, setValue] = useState(0);
  const [turn, setTurn] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [lives, setLives] = useState(2);
  const [finish, setFinish] = useState(false);
  const [end, setEnd] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [helpShow, setHelpShow] = useState(false);
  const target = useRef(null);

  // shuffle cards and add an id to each card every new game
  const shuffleCards = () => {
    const shuffledCards = [...cardNumbers]
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card)
      .map((card) => ({ ...card, id: Math.random() }));

    setValue(0);
    setTurn(0);
    setPrevValue(0);
    setLives(2);
    setCards(shuffledCards);
    setShow(false);
    setFinish(false);
    setEnd(false);
  };

  useEffect(() => {
    if (value === 9 && prevValue === 8) {
      setFinish(true);
      handleShow();
    }

    if (value === prevValue + 1) {
      setPrevValue(prev => prev + 1);
    } else if (value) {
      setLives(prev => prev - 1);
      setValue(prevValue);
    }

  }, [turn])

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (lives === 0) {
      handleShow();
    }
  }, [lives])

  useEffect(() => {
    value ? setEnd(true) : setEnd(false)
  }, [show])

  const displayNumbers = cards.map(card => {
    return (
      <NumberCard 
        key={card.id}
        card={card}
        value={value}
        setTurn={setTurn}
        setValue={setValue}
        lives={lives}
        end={end}
      />
    )
  })
  
  return (
    <div onClick={() => helpShow ? setHelpShow(false) : null}>
      <div className="top">
        <Link to="/" className="link"><button className="back-button">← Back</button></Link>
        <h4>Number Memory Game</h4>
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
                  <p><strong>Numbers</strong> - Memorize the placement of the cards. Once they are face down, try to flip the cards in the correct order starting from 1 all the way to 9. Be careful flipping the X cards!</p>
                </div>
              </Tooltip>
            )}
          </Overlay>
        </div>
      </div>
      <div className="number-grid">
        {displayNumbers}
      </div>
      <p>Lives: {lives}</p>
      <Modal show={show} onHide={handleClose} className="number-result" animation={false} >
        <Modal.Header closeButton className="number-result-header" >
        </Modal.Header>
        <Modal.Body>
          { finish ? 
            <div>
              <Confetti width="500"/>
              <p>Congratulations on finishing!</p>
            </div> : 
            <p>You managed to correctly flip <strong>{prevValue} card(s)</strong>.</p>
          }
          <p>Thank you for playing and feel free to try again! 😊</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default NumberMemoryIndex;