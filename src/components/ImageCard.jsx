import { useState } from 'react';
import loadingImg from '/loading.gif';

function ImageCard({ onClick, ...imgProps }) {
  const [loading, setLoading] = useState(true);

  const handleLoadEnd = () => setLoading(false);

  return loading ? (
    <button onClick={onClick} className="card" style={{ position: 'relative' }}>
      <img
        {...imgProps}
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
      <img {...imgProps} />
    </button>
  );
}

export default ImageCard;
