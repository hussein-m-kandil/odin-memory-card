import Card from './Card.jsx';

function Board() {
  const contents = new Array(9).fill(null).map((_, i) => i);

  return (
    <div className="board">
      {contents.map((data) => (
        <Card key={data}>
          <span>{data}</span>
        </Card>
      ))}
    </div>
  );
}

export default Board;
