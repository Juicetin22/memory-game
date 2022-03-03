import React, { useState, useEffect } from "react";
import './index.scss';
import NumberCard from "./NumberCard";
import { Modal } from "react-bootstrap";
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
  const [turns, setTurns] = useState(0);
  const [value, setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [finish, setFinish] = useState(false);
  const [end, setEnd] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // shuffle cards and add an id to each card every new game
  const shuffleCards = () => {
    const shuffledCards = [...cardNumbers]
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card)
      .map((card) => ({ ...card, id: Math.random() }));

    setValue(0);
    setPrevValue(0);
    setCards(shuffledCards);
    setTurns(0);
    setShow(false);
    setFinish(false);
    setEnd(false);
  };

  useEffect(() => {
    if (value === 9 && turns === 8) {
      setFinish(true);
      handleShow();
    }

    if (value === prevValue + 1) {
      setPrevValue(prev => prev + 1);
      setTurns(prev => prev + 1);
    } else {
      return value ? handleShow() : null
    }

  }, [value])

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    value ? setEnd(true) : setEnd(false)
  }, [show])

  const displayNumbers = cards.map(card => {
    return (
      <NumberCard 
        key={card.id}
        card={card}
        setValue={setValue}
        end={end}
      />
    )
  })
  
  return (
    <div>
      <div className="top">
        <button><Link to="/">← Back</Link></button>
        <h4>Number Memory Game</h4>
        <button onClick={shuffleCards}>New Game</button>
      </div>
      <div className="number-grid">
        {displayNumbers}
      </div>
      <Modal show={show} onHide={handleClose} className="number-result" animation={false} >
        <Modal.Header closeButton className="number-result-header" >
        </Modal.Header>
        <Modal.Body>
          { finish ? 
            <div>
              <Confetti />
              <p>Congratulations on finishing!</p>
            </div> : 
            <p>You managed to flip <strong>{turns} card(s)</strong>.</p>
          }
          <p>Thank you for playing and feel free to try again! 😊</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default NumberMemoryIndex;