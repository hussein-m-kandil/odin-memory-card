function Info({ score, highScore, maxScore }) {
  return (
    <div className="info">
      <div>
        <span className="tag">Score:</span>&nbsp;&nbsp;
        <span className="value">{`${score}/${maxScore}`}</span>
      </div>
      <div>
        <span className="tag">High Score:</span>&nbsp;&nbsp;
        <span className="value">{`${highScore}/${maxScore}`}</span>
      </div>
    </div>
  );
}

export default Info;
