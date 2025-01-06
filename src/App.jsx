import { useState, useEffect } from 'react';
import Info from './components/Info.jsx';
import Board from './components/Board.jsx';
import ResultModal from './components/ResultModal.jsx';
import shuffleArray from './utils/shuffleArray.js';
import fetchUniqueImageSources from './utils/fetchImageSources.js';

function App() {
  const [images, setImages] = useState(null);
  const [memory, setMemory] = useState([]);
  const [result, setResult] = useState({ highScore: 0, info: null });
  const [lastFocusedCard, setLastFocusedCard] = useState(null);

  useEffect(() => {
    // Extra count added on fetch, so keep the count up to 32 to avoid exceeding 50 (API limit)
    fetchUniqueImageSources(18)
      .then((sources) => setImages(sources.map((src, id) => ({ id, src }))))
      .catch((e) => setImages(e));
  }, []);

  useEffect(() => {
    if (lastFocusedCard) {
      lastFocusedCard.focus();
      setLastFocusedCard(null);
    }
  }, [lastFocusedCard]);

  const announceGameLose = (id, e) => {
    setResult({
      highScore:
        memory.length > result.highScore ? memory.length : result.highScore,
      info: {
        title: 'Game Over!',
        score: `${memory.length}/${images.length}`,
        src: images.find((img) => img.id === id)?.src,
        message: `You have clicked on this image twice!`,
        lastPlayedCardElement: e.currentTarget,
      },
    });
  };

  const announceGameWin = (id, e) => {
    setMemory([...memory, id]);
    setResult({
      highScore: images.length,
      info: {
        title: 'Congratulations!',
        score: `${memory.length + 1}/${images.length}`,
        message: `You have achieved the maximum score!`,
        lastPlayedCardElement: e.currentTarget,
      },
    });
  };

  const keepPlaying = (id) => setMemory([...memory, id]);

  const handleCardClicked = (id, e) => {
    setImages(shuffleArray(images));
    if (memory.includes(id)) announceGameLose(id, e);
    else if (memory.length + 1 === images.length) announceGameWin(id, e);
    else keepPlaying(id, e);
  };

  const handleModalClose = () => {
    setLastFocusedCard(result.info.lastPlayedCardElement);
    setResult({ ...result, info: null });
    setMemory([]);
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Odin Memory Card</h1>
        {Array.isArray(images) && (
          <Info
            score={memory.length}
            maxScore={images.length}
            highScore={result.highScore}
          />
        )}
      </div>
      <Board cardImages={images} onCardClicked={handleCardClicked} />
      {result.info && (
        <ResultModal info={result.info} onClose={handleModalClose} />
      )}
    </>
  );
}

export default App;
