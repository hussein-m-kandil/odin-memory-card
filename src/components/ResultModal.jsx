import { useEffect, useRef } from 'react';
import extractAltFromSrc from '../utils/extractAltFromSrc';

function ResultModal({ info, onClose }) {
  const modalBodyRef = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    closeBtn.current?.focus();
    setTimeout(() => {
      modalBodyRef.current?.scrollIntoView({
        behavior: 'instant',
        inline: 'center',
        block: 'center',
      });
    }, 100);
  }, []);

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
    document.documentElement.setAttribute('style', 'position: relative;');
    return () => {
      document.removeEventListener('focusin', trapFocus);
      document.documentElement.removeAttribute('style');
    };
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
        onFocus={(e) => {
          if (e.target === e.currentTarget) {
            e.target.scrollIntoView({
              behavior: 'instant',
              inline: 'center',
              block: 'center',
            });
          }
        }}
      >
        <h2 className="modal-title">{info.title}</h2>
        <p className="modal-score">Your score is {info.score}</p>
        {info.src && <img src={info.src} alt={extractAltFromSrc(info.src)} />}
        <p className="modal-message">{info.message}</p>
        <button
          type="button"
          className="modal-btn"
          onClick={onClose}
          ref={closeBtn}
        >
          OK!
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
