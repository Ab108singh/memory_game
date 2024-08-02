import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('fruits'); // Default theme
  const [difficulty, setDifficulty] = useState('easy'); // Default difficulty
  const [showVictory, setShowVictory] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleVictory = () => {
    setShowVictory(true);
    setShowGameOver(false);
  };

  const handleGameOver = () => {
    setShowGameOver(true);
    setShowVictory(false);
  };


  console.log("hello ")
  return (
    <div className={`app-container ${theme}-theme ${difficulty}-theme`}>
      <div className="header">
        Memory Game
      </div>
      <div className="difficulty-selector">
        <label>
          Difficulty:
          <select value={difficulty} onChange={handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      <div className="difficulty-selector">
        <label>
          Theme:
          <select value={theme} onChange={handleThemeChange}>
            <option value="fruits">Fruits</option>
            <option value="animals">Animals</option>
            <option value="vehicles">Vehicles</option>
          </select>
        </label>
      </div>
      <div className="main-content">
        <Board 
          theme={theme} 
          difficulty={difficulty}
          onVictory={handleVictory} 
          onGameOver={handleGameOver} 
        />
      </div>
      <div className={`victory-popup ${showVictory ? 'show' : ''}`}>
        <p>Congratulations! You won!</p>
      </div>
      <div className={`game-over-popup ${showGameOver ? 'show' : ''}`}>
        <p>Game Over! You ran out of time.</p>
      </div>
    </div>
  );
};

export default App;
