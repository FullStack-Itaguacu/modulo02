import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

function Modal({ show, onClose, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (event) => {
    event.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999
      }}
    >
      <div
        style={{
          background: 'white',
          width: 500,
          borderRadius: 15,
          padding: 15,
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: 'black'
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: 25
          }}
        >
          <button
            style={{
              cursor: "pointer",
              background: "white",
              marginRight: 8,
              borderRadius: 50
            }}
            href="#" onClick={handleCloseClick}>
            x
          </button>
        </header>
        <div
          style={{
            paddingTop: 10
          }}
        >
          {children}
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root'),
    );
  }
  return null;
}

export { Modal }