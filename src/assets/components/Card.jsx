import React from "react";
import { useState } from "react";

const Card = (props) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };
  return (
    <div
      className={`Card ${flipped ? "flipped" : ""}`}
      id={props.difficulty}
      onClick={handleFlip}
    >
      <div className="Card-inner">
        <div className="Card-front">
          <img src={props.image} style={{ filter: "brightness(0%)" }} />
        </div>
        <div className="Card-back">
          <img src={props.image} style={{ filter: "none" }} />
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
