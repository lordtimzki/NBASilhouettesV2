import "./App.css";
import Logo from "./assets/Logo.png";
import Card from "./assets/components/Card";
import players from "./Players";
import { useState } from "react";

function App() {
  const [seenIndices, setSeenIndices] = useState([0]);
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    if (seenIndices.length >= players.length) {
      setSeenIndices([0]);
      setIndex(0);
      return;
    }

    let newIndex = (index + 1) % players.length;

    setSeenIndices([...seenIndices, newIndex]);
    setIndex(newIndex);
  };
  const handleBack = () => {
    if (seenIndices.length > 1) {
      const newSeenIndices = seenIndices.slice(0, -1);
      setSeenIndices(newSeenIndices);
      setIndex(newSeenIndices[newSeenIndices.length - 1]);
    }
  };

  let currentPlayer = players[index];
  return (
    <>
      <div className="info">
        <img className="logo" src={Logo} />
        <h1>Guess the NBA Silhouettes!</h1>
        <h3>
          Do you have elite ball knowledge? Test your knowledge with these
          (current) players!
        </h3>
        <p>Number of players: {players.length}</p>
        <Card
          name={currentPlayer.name}
          image={currentPlayer.image}
          difficulty={currentPlayer.difficulty}
          key={index}
        />
        <span class="inputBox">
          Guess the player here:{" "}
          <form className="inlineForm">
            <input ckassName="inlineInput" type="text"></input>
          </form>
          <button>Submit</button>
        </span>
        <span>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </span>
      </div>
    </>
  );
}

export default App;
