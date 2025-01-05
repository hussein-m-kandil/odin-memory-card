import { useEffect, useState } from 'react';

function Loader() {
  const [ellipsesLen, setEllipsesLen] = useState(0);

  const ellipses = ''.padEnd(ellipsesLen, '.');

  useEffect(() => {
    const id = setTimeout(() => setEllipsesLen((ellipsesLen + 1) % 4), 500);
    return () => clearTimeout(id);
  }, [ellipsesLen]);

  return (
    <p style={{ whiteSpace: 'nowrap', width: '3.5em', margin: '0 auto' }}>
      {`${'Loading'}${ellipses}`}
    </p>
  );
}

export default Loader;
