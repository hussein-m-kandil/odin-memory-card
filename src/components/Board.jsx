import ImageCard from './ImageCard.jsx';
import CardsLoader from './CardsLoader.jsx';

function Board({ cardImages }) {
  return (
    <div className={`board${cardImages ? ' grid' : ''}`}>
      {cardImages ? (
        cardImages.map((src) => <ImageCard key={src} src={src} />)
      ) : (
        <CardsLoader />
      )}
    </div>
  );
}

export default Board;
