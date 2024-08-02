import * as animalImages from '../images/animals';
import * as vehicleImages from '../images/vehicles';
import * as fruitImages from '../images/fruits';

const getImagesByTheme = (theme) => {
  switch (theme) {
    case 'animals':
      return animalImages;
    case 'vehicles':
      return vehicleImages;
    case 'fruits':
    default:
      return fruitImages;
  }
};

const generateDeck = (theme, difficulty) => {
  const images = getImagesByTheme(theme);
  let symbols = Object.values(images); // Convert image objects to an array

  let numberOfPairs;
  switch (difficulty) {
    case 'medium':
      numberOfPairs = 8; // 8 pairs, 16 cards
      break;
    case 'hard':
      numberOfPairs = 16; // 16 pairs, 32 cards
      break;
    default:
      numberOfPairs = 4; // 4 pairs, 8 cards
      break;
  }

  symbols = symbols.slice(0, numberOfPairs); // Take the required number of pairs

  return [...symbols, ...symbols].sort(() => Math.random() - 0.5);
};

export { generateDeck };
