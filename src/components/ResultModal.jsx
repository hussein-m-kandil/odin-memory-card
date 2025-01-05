import extractAltFromSrc from '../utils/extractAltFromSrc';
import Modal from './Modal';

function ResultModal({ info, onClose }) {
  return (
    <Modal className="modal" onClose={onClose}>
      <h2 className="modal-title">{info.title}</h2>
      <p className="modal-score">Your score is {info.score}</p>
      {info.src && <img src={info.src} alt={extractAltFromSrc(info.src)} />}
      <p className="modal-body">{info.message}</p>
      <button autoFocus type="button" className="modal-btn" onClick={onClose}>
        OK!
      </button>
    </Modal>
  );
}

export default ResultModal;
