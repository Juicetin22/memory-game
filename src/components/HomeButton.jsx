import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomeButton.scss"

const HomeButton = (props) => {
  const { gamePath, gameTitle } = props;
  
  return (
    <div className="home-buttons">
      <Link to={`/${gamePath}`} className="link">
        <Button variant='outline-info' className="link-button">
          {gameTitle}
        </Button>
      </Link>
    </div>
  )
}

export default HomeButton;