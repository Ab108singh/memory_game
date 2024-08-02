import React from 'react';
import './Card.css';

const Card = ({ content, isFlipped, onClick }) => (
  <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
    {isFlipped ? <img src={content} alt="Card content" /> : <div className="card-back" />}
  </div>
);

export default Card;
