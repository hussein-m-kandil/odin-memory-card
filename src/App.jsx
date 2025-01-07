import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Info from './components/Info.jsx';
import Board from './components/Board.jsx';
import ResultModal from './components/ResultModal.jsx';
import shuffleArray from './utils/shuffleArray.js';
import fetchUniqueImageSources from './utils/fetchImageSources.js';

const HIGH_SCORE_KEY = 'high_score';

let highScore;

try {
  highScore = JSON.parse(localStorage.getItem(HIGH_SCORE_KEY));
} catch {
  console.log('Could not get the high score from the local storage!');
}

if (!highScore) highScore = 0;

function App() {
  const [result, setResult] = useState({ highScore, info: null });
  const [images, setImages] = useState(null);
  const [memory, setMemory] = useState([]);
  const lastFocusedCardRef = useRef(null);

  useEffect(() => {
    // Extra count added on fetch, so keep the count up to 32 to avoid exceeding 50 (API limit)
    let [validData, invalidateData] = [true, () => (validData = false)];
    fetchUniqueImageSources(12)
      .then((sources) => {
        if (validData) {
          setImages(sources.map((src, id) => ({ id, src })));
        }
      })
      .catch((e) => setImages(e));
    return invalidateData;
  }, []);

  useEffect(() => {
    if (!result.info && lastFocusedCardRef.current) {
      lastFocusedCardRef.current.focus();
      lastFocusedCardRef.current = null;
    }
  });

  const updateLastFocusedCardRef = (lastFocusedCard) => {
    lastFocusedCardRef.current = lastFocusedCard;
  };

  const announceGameLose = (id) => {
    setResult({
      highScore:
        memory.length > result.highScore ? memory.length : result.highScore,
      info: {
        title: 'Game Over!',
        score: `${memory.length}/${images.length}`,
        src: images.find((img) => img.id === id)?.src,
        message: `You have clicked on this image twice!`,
      },
    });
  };

  const announceGameWin = (id) => {
    setMemory([...memory, id]);
    setResult({
      highScore: images.length,
      info: {
        title: 'Congratulations!',
        score: `${memory.length + 1}/${images.length}`,
        message: `You have achieved the maximum score!`,
      },
    });
  };

  const keepPlaying = (id) => setMemory([...memory, id]);

  const handleCardClicked = (id, e) => {
    setImages(shuffleArray(images));
    updateLastFocusedCardRef(e.currentTarget);
    if (memory.includes(id)) announceGameLose(id);
    else if (memory.length + 1 === images.length) announceGameWin(id);
    else keepPlaying(id);
  };

  const handleModalClose = () => {
    setMemory([]);
    setResult({ ...result, info: null });
    try {
      localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(result.highScore));
    } catch {
      console.log('Could not save the high score in the local storage!');
    }
  };

  return (
    <>
      {createPortal(
        <>
          <h1 className="title">Odin Memory Card</h1>
          {Array.isArray(images) && (
            <Info
              score={memory.length}
              maxScore={images.length}
              highScore={result.highScore}
            />
          )}
        </>,
        document.getElementById('header')
      )}
      <Board cardImages={images} onCardClicked={handleCardClicked} />
      {result.info &&
        createPortal(
          <ResultModal info={result.info} onClose={handleModalClose} />,
          document.body
        )}
    </>
  );
}

export default App;
