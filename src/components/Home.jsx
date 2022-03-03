import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {

  return (
    <div className='home'>
      <Card className="home-card">
        <Card.Body>
        <h2>Welcome!</h2>
        <p>This was a mini-project that I wanted to make ☺️</p>
        <p>Please choose one of the three memory games to play!</p>
        
        <div className='game-options'>
          <Link to="/matching-cards" className="link">
            <Button variant='outline-info' className="link-button">Matching Cards</Button>
          </Link>
          <p></p>
          <Link to="/numbers" className="link">
            <Button variant='outline-info' className="link-button">Numbers</Button>
          </Link>
          {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} 
          <Link to="/memoradd" className="link">
            <Button variant='outline-info' className="link-button">Memoradd</Button>
          </Link>
        </div>
        </Card.Body>
      </Card>
      <footer className='icons-link'>Icons used in this app can be found at <a href="https://icons8.com/">here</a></footer>
    </div>
  )
}

export default Home;