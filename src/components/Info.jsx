function Info({ score, highScore }) {
  return (
    <div className="info">
      <div>
        <span className="tag">Score:</span>{' '}
        <span className="value">{score}</span>
      </div>
      <div>
        <span className="tag">High Score:</span>{' '}
        <span className="value">{highScore}</span>
      </div>
    </div>
  );
}

export default Info;
