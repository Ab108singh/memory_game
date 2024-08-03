import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import './Board.css';
import { generateDeck } from './deckUtils';

const Board = ({ theme, difficulty, onVictory, onGameOver }) => {
  const [deck, setDeck] = useState(() => generateDeck(theme, difficulty));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      onGameOver();
    }
  }, [timeLeft, gameOver, onGameOver]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (deck[firstIndex] === deck[secondIndex]) {
        setMatchedPairs((prev) => [...prev, deck[firstIndex]]);
        setFlippedCards([]);
        if (matchedPairs.length + 1 === deck.length / 2 && timeLeft > 0) {
          setTimeout(onVictory, 1000); // Ensure the cards flip before displaying the message
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  }, [flippedCards, deck, matchedPairs.length, onVictory, timeLeft]);

  const handleCardClick = useCallback((index) => {
    if (!gameOver && flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards((prev) => [...prev, index]);
    }
  }, [gameOver, flippedCards]);

  const isFlipped = useCallback((index) => {
    return flippedCards.includes(index) || matchedPairs.includes(deck[index]);
  }, [flippedCards, matchedPairs, deck]);

  useEffect(() => {
    setDeck(generateDeck(theme, difficulty));
    setFlippedCards([]);
    setMatchedPairs([]);
    setTimeLeft(60);
    setGameOver(false);
  }, [theme, difficulty]);

  return (
    <div className={`board ${theme}-theme ${difficulty}-theme`}>
      <div className="timer">Time Left: {timeLeft}s</div>
      <div className="score">Score: {matchedPairs.length}</div>
      {deck.map((card, index) => (
        <Card
          key={index}
          content={card}
          isFlipped={isFlipped(index)}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
