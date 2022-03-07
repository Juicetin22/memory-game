import React, { useState, useRef } from "react";
import { Card, Button, Overlay, Tooltip } from "react-bootstrap";
import "./Home.scss";
import HomeButton from "./HomeButton";

const gameList = [
  { "gamePath": "matching-cards", "gameTitle": "Matching Cards", "gameId": 1 },
  { "gamePath": "numbers", "gameTitle": "Numbers", "gameId": 2 },
  { "gamePath": "memoradd", "gameTitle": "Mem0radd", "gameId": 3 }
];

const Home = () => {
  const [show,setShow] = useState(false);
  const target = useRef(null);

  const games = gameList.map(game => {
    return (
      <>
        <HomeButton 
          key={game.gameId} 
          gamePath={game.gamePath} 
          gameTitle={game.gameTitle} 
        />
      </>
    )
  })

  return (
    <div className='home' onClick={() => show ? setShow(false) : null}>
      <Card className="home-card">
        <Card.Body>
          <h2>Welcome!</h2>
          <p>This was a mini-project that I wanted to make ☺️</p>
          <p>Please choose one of the three memory games to play!</p>
          
          <div className='game-options'>
            {games[0]}
            <div className="second-game-line">
              {games[1]}
              {games[2]}
            </div>
          </div>

          <div className="help">
            <p className="click-here">Click for instructions</p>
            <img src="https://img.icons8.com/material-outlined/24/000000/chevron-right.png" alt="" className="bounce"/>

            <Button variant="link" ref={target} onClick={() => setShow(!show)} className="help-button" >
              ?
            </Button>
            <Overlay target={target.current} show={show} placement="left-start" className="instructions">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  How to play:
                  <div className="rules">
                    <p><strong>Matching Cards</strong> - Flip over two cards at a time and get them to match. Try to get all the pairs to match with the fewest turns possible!</p>
                    <p><strong>Numbers</strong> - Memorize the placement of the cards. Once they are face down, try to flip the cards in the correct order starting from 1 all the way to 9. Be careful flipping the X cards!</p>
                    <p><strong>Mem0radd</strong> - The purpose of the game is to try to score as many points as possible. Try to remember the placement of the cards, and start the game by flipping over a card with number 1 on it. From there, you can either flip over a card of the same number OR a card with a number that is one greater than the previous card (Example flipping sequence: Card number 1 - Card number 1 - Card number 2 - Card number 3 - ... Card number 9, and finally Card number 0). Lose one life when you flip over a card that does not follow the numerical pattern. However, the game ends when you flip over the number 0 card at any point in the game!</p>
                  </div>
                </Tooltip>
              )}
            </Overlay>
          </div>
        </Card.Body>
      </Card>
      <footer className='icons-link'>Icons used in this app can be found at <a href="https://icons8.com/">here</a></footer>
    </div>
  )
}

export default Home;