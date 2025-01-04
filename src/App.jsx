import { useState } from 'react';
import Board from './components/Board.jsx';
import { useEffect } from 'react';

function App() {
  const [images, setImages] = useState(null);
  const cardsCount = 9;

  useEffect(() => {
    fetch(`https://dog.ceo/api/breeds/image/random/${cardsCount}`)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        if (
          String(data.status).toLowerCase() !== 'success' ||
          !Array.isArray(data.message)
        ) {
          throw data;
        }
        setImages(data.message);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <h1 className="title">Odin Memory Card</h1>
      <Board cardImages={images} />
    </>
  );
}

export default App;
