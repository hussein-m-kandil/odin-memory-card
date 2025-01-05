import { useEffect, useRef } from 'react';

let initRootPosition = document.documentElement.style.position;

function Modal({
  onClose,
  children,
  className = '',
  bodyBGColor = '#000',
  borderRadius = '1rem',
}) {
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
    document.documentElement.style.position = 'relative';
    return () => {
      document.removeEventListener('focusin', trapFocus);
      document.documentElement.style.position = initRootPosition;
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        backgroundColor: '#0007',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '999999',
      }}
      onClick={onClose}
    >
      <div
        tabIndex={-1}
        ref={modalBodyRef}
        style={{
          borderRadius,
          width: '85vw',
          maxWidth: '500px',
          minHeight: '300px',
          padding: '2rem 1rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: bodyBGColor,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        onClick={(e) => e.stopPropagation()}
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
        {children}
      </div>
    </div>
  );
}

export default Modal;
