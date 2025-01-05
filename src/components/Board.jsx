import ImageCard from './ImageCard.jsx';
import CardsLoader from './CardsLoader.jsx';

function Board({ cardImages, onCardClicked }) {
  return (
    <div className={`board${Array.isArray(cardImages) ? ' grid' : ''}`}>
      {cardImages ? (
        Array.isArray(cardImages) ? (
          cardImages.map(({ id, src }) => (
            <ImageCard key={id} src={src} onClick={() => onCardClicked(id)} />
          ))
        ) : (
          <div className="error">
            Could not load any data! Please check your internet connection and
            try again.
          </div>
        )
      ) : (
        <CardsLoader />
      )}
    </div>
  );
}

export default Board;
