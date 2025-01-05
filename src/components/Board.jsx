import ImageCard from './ImageCard.jsx';
import Loader from './Loader.jsx';

function Board({ cardImages, onCardClicked }) {
  return (
    <div className={`board${Array.isArray(cardImages) ? ' grid' : ''}`}>
      {cardImages ? (
        Array.isArray(cardImages) ? (
          cardImages.map(({ id, src }) => (
            <ImageCard
              key={id}
              src={src}
              onClick={(e) => onCardClicked(id, e)}
            />
          ))
        ) : (
          <div className="error">
            Could not load any data! Please check your internet connection and
            try again.
          </div>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Board;
