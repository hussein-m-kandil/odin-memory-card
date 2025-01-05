import { useState, useEffect } from 'react';
import Board from './Board.jsx';
import shuffleArray from '../utils/shuffleArray.js';
import fetchUniqueImageSources from '../utils/fetchImageSources.js';

function Game() {
  const [images, setImages] = useState(null);
  // Keep the count up to 32 to avoid exceeding 50 (API limit) after overhead added while fetching
  const imagesCount = 9;

  useEffect(() => {
    fetchUniqueImageSources(imagesCount)
      .then((sources) => setImages(sources.map((src, id) => ({ id, src }))))
      .catch((e) => setImages(e));
  }, []);

  return (
    <Board
      cardImages={images}
      onCardClicked={() => setImages(shuffleArray(images))}
    />
  );
}

export default Game;
