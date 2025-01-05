import { useState, useEffect } from 'react';
import Info from './Info.jsx';
import Board from './Board.jsx';
import shuffleArray from '../utils/shuffleArray.js';
import fetchUniqueImageSources from '../utils/fetchImageSources.js';

function Game() {
  const [images, setImages] = useState(null);
  const [memory, setMemory] = useState([]);
  const [highScore, setHighScore] = useState(0);

  // Keep the count up to 32 to avoid exceeding 50 (API limit) after overhead added while fetching
  const imagesCount = 18;

  useEffect(() => {
    fetchUniqueImageSources(imagesCount)
      .then((sources) => setImages(sources.map((src, id) => ({ id, src }))))
      .catch((e) => setImages(e));
  }, []);

  const handleCardClicked = (id) => {
    setImages(shuffleArray(images));
    if (memory.includes(id)) {
      if (memory.length > highScore) setHighScore(memory.length);
      setMemory([]);
    } else {
      setMemory([...memory, id]);
    }
  };

  return (
    <>
      {Array.isArray(images) && (
        <Info score={memory.length} highScore={highScore} />
      )}
      <Board cardImages={images} onCardClicked={handleCardClicked} />
    </>
  );
}

export default Game;
