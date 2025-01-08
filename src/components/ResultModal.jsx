import { useEffect, useRef } from 'react';
import extractAltFromSrc from '../utils/extractAltFromSrc';

function ResultModal({ info, onClose }) {
  const closeBtnRef = useRef(null);
  const modalBodyRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeBtnRef.current?.focus();
      modalBodyRef.current?.scrollIntoView({
        behavior: 'instant',
        inline: 'center',
        block: 'center',
      });
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const rootElement = document.documentElement;
    const originalRootPosition = rootElement.style.position;
    rootElement.style.position = 'relative';
    return () => {
      rootElement.style.position = originalRootPosition;
      if (!rootElement.getAttribute('style')) {
        rootElement.removeAttribute('style');
      }
    };
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
        {info.src ? (
          <img src={info.src} alt={extractAltFromSrc(info.src)} />
        ) : (
          <figure>
            <img src="/golden_cup.png" alt="Winner's golden cup." />
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
        <button
          type="button"
          className="modal-btn"
          onClick={onClose}
          ref={closeBtnRef}
        >
          OK!
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
