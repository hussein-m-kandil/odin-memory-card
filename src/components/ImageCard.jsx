import { useState } from 'react';
import loadingImg from '/loading.gif';

function ImageCard(props) {
  const [loading, setLoading] = useState(true);

  const handleLoadEnd = () => setLoading(false);

  return loading ? (
    <div className="card" style={{ position: 'relative' }}>
      <img
        {...props}
        style={{ display: 'none' }}
        onLoad={handleLoadEnd}
        onError={handleLoadEnd}
      />
      <img
        src={loadingImg}
        alt="Loading..."
        style={{ width: '32px', height: '32px', position: 'absolute' }}
      />
    </div>
  ) : (
    <div className="card">
      <img {...props} />
    </div>
  );
}

export default ImageCard;
