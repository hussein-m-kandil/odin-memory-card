import { useEffect, useRef } from 'react';
import extractAltFromSrc from '../utils/extractAltFromSrc';

// Preload the golden cup image to avoid slow loading when mount it
const goldenCup = new Image();
goldenCup.src = '/golden_cup.png';

function ResultModal({ info, onClose }) {
  const modalBodyRef = useRef(null);

  useEffect(() => {
    const trapFocus = (e) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
      const isDescendant = Boolean(
        modalBodyRef.current.compareDocumentPosition(e.target) &
          Node.DOCUMENT_POSITION_CONTAINED_BY
      );
      if (modalBodyRef.current && !isDescendant) {
        modalBodyRef.current.focus();
      }
    };
    document.addEventListener('focusin', trapFocus);
    return () => document.removeEventListener('focusin', trapFocus);
  }, []);

  const handleEscapeKeyPress = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="result-modal" onClick={onClose}>
      <div
        tabIndex={-1}
        ref={modalBodyRef}
        className="modal-body"
        onClick={(e) => e.stopPropagation()}
        onKeyDownCapture={handleEscapeKeyPress}
      >
        <h2 className="modal-title">{info.title}</h2>
        <p className="modal-score">Your score is {info.score}</p>
        {info.src ? (
          <img src={info.src} alt={extractAltFromSrc(info.src)} />
        ) : (
          <figure>
            <img src={goldenCup.src} alt="Winner's golden cup." />
            <figcaption>
              <a
                className="attribute"
                href="https://www.freepik.com/free-vector/golden-winners-cup_4320674.htm"
              >
                Golden Winners Cup From Freepik
              </a>
            </figcaption>
          </figure>
        )}
        <p className="modal-message">{info.message}</p>
        <button type="button" className="modal-btn" onClick={onClose} autoFocus>
          OK!
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
