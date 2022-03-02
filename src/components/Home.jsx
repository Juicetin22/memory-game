import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className='home'>
      <h2>Welcome!</h2>
      <p>This was a mini self-project that I wanted to make ☺️</p>
      <p>Please choose one of the three memory games to play!</p>
      
      <div className='game-options'>
        <Button variant='outline-info'>
          <Link to="/matching-cards">Matching Cards</Link>
        </Button>
        <p></p>
        <Button variant='outline-info'>
          <Link to="/numbers">Numbers</Link>
        </Button>
        {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} 
        <Button variant='outline-info'>
          <Link to="/memoradd">Memoradd</Link>
        </Button>
      </div>
      <p></p>
      <p></p>
      <footer>Icons used in this app can be found at <a href="https://icons8.com/">here</a></footer>
    </div>
  )
}

export default Home;