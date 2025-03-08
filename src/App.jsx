import "./App.css";
import Logo from "./assets/Logo.png";
import Card from "./assets/components/Card";
import players from "./Players";
import { useState } from "react";

function App() {
  const [seenIndices, setSeenIndices] = useState([0]);
  const [index, setIndex] = useState(0);
  const [shuffledPlayers, setShuffledPlayers] = useState(players);
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (seenIndices.length >= players.length) {
      setSeenIndices([0]);
      setIndex(0);
      return;
    }

    let newIndex = (index + 1) % shuffledPlayers.length;

    setSeenIndices([...seenIndices, newIndex]);
    setIndex(newIndex);
    setSubmitted(false);
    setIsCorrect(false);
    setGuess("");
  };
  const handleBack = () => {
    if (seenIndices.length > 1) {
      const newSeenIndices = seenIndices.slice(0, -1);
      setSeenIndices(newSeenIndices);
      setIndex(newSeenIndices[newSeenIndices.length - 1]);
      setSubmitted(false);
      setIsCorrect(false);
      setGuess("");
    }
  };

  const handleShuffle = () => {
    const shuffled = [...players];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledPlayers(shuffled);
    setSeenIndices([0]);
    setIndex(0);
    setSubmitted(false);
    setIsCorrect(false);
    setGuess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (guess.toLowerCase() === shuffledPlayers[index].name.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  let currentPlayer = shuffledPlayers[index];
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
          canFlip={submitted}
        />
        <span class="inputBox">
          Guess the player here:{" "}
          <form className="inlineForm" onSubmit={handleSubmit}>
            <input
              className={`inlineInput ${
                submitted ? (isCorrect ? "correct" : "incorrect") : ""
              }`}
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            ></input>
          </form>
          <button type="submit">Submit</button>
        </span>
        <span>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleShuffle}>Shuffle</button>
        </span>
      </div>
    </>
  );
}

export default App;
