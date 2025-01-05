import { useState } from 'react';
import loadingImg from '/loading.gif';
import extractAltFromSrc from '../utils/extractAltFromSrc.js';

function ImageCard({ src, onClick }) {
  const [loading, setLoading] = useState(true);

  const handleLoadEnd = () => setLoading(false);

  return loading ? (
    <button onClick={onClick} className="card" style={{ position: 'relative' }}>
      <img
        src={src}
        alt={extractAltFromSrc(src)}
        style={{ display: 'none' }}
        onLoad={handleLoadEnd}
        onError={handleLoadEnd}
      />
      <img
        src={loadingImg}
        alt="Loading..."
        style={{ width: '32px', height: '32px', position: 'absolute' }}
      />
    </button>
  ) : (
    <button onClick={onClick} className="card">
      <img src={src} alt={extractAltFromSrc(src)} />
    </button>
  );
}

export default ImageCard;
