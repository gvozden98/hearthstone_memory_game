import { useState, useEffect } from "react";
import SingleCard from "./components/singleCard";
import "./App.css";

const randomCards = [
  { src: "/img/doomsayer-1.webp", matched: false },
  { src: "/img/mukla-1.webp", matched: false },
  { src: "/img/shadowboxer-1.webp", matched: false },
  { src: "/img/snowchugger-1.webp", matched: false },
  { src: "/img/whelp-1.webp", matched: false },
  { src: "/img/finja-1.webp", matched: false },
  { src: "/img/gnome-1.webp", matched: false },
  { src: "/img/healbot-1.webp", matched: false },
  { src: "/img/lich-1.webp", matched: false },
  { src: "/img/moroes-1.webp", matched: false },
  { src: "/img/patches-1.webp", matched: false },
  { src: "/img/racketeer-1.webp", matched: false },
  { src: "/img/rafaam-1.webp", matched: false },
];
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
let cardImages = shuffleArray(randomCards).slice(0, 6);

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h2>Hearthstone Memory Match</h2>
      <div className="controls">
        <button onClick={shuffleCards} className="elements">
          New Game
        </button>
        <audio
          src="/src/Sound/soundtrack.mp3"
          controls
          loop
          id="audioTrack"
          className="elements"
        ></audio>
        <p className="elements">Turns: {turns}</p>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
