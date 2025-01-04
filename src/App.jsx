import { useState, useEffect } from 'react';
import Board from './components/Board.jsx';
import fetchUniqueImageSources from './utils/fetchImageSources.js';

function App() {
  const [images, setImages] = useState(null);
  // Keep the count up to 32 to avoid exceeding 50 (API limit) after overhead added while fetching
  const imagesCount = 9;

  useEffect(() => {
    fetchUniqueImageSources(imagesCount)
      .then((sources) => setImages(sources.map((src, id) => ({ id, src }))))
      .catch((e) => setImages(e));
  }, []);

  return (
    <>
      <h1 className="title">Odin Memory Card</h1>
      <Board cardImages={images} />
    </>
  );
}

export default App;
