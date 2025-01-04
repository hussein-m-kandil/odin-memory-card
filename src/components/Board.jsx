import ImageCard from './ImageCard.jsx';
import CardsLoader from './CardsLoader.jsx';

function Board({ cardImages, onCardClicked }) {
  const getAltFromImgSrc = (imgSrc) => {
    const alt = imgSrc.split('/').at(-2).replaceAll(/%|_|-/g, ' ');
    return alt ? `${alt[0].toUpperCase()}${alt.slice(1) || ''}` : null;
  };

  return (
    <div className={`board${Array.isArray(cardImages) ? ' grid' : ''}`}>
      {cardImages ? (
        Array.isArray(cardImages) ? (
          cardImages.map(({ id, src }) => (
            <ImageCard
              key={id}
              src={src}
              alt={getAltFromImgSrc(src)}
              onClick={onCardClicked}
            />
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
