import { useState } from 'react';
import './ChatButton.css';
import { PythonWS } from '../WebRTC/PythonWS';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className="chatButton" 
        onClick={toggleChat}
        aria-label="Open WebRTC Chat"
      >
        <span className="chatButtonText">Assistant</span>
      </button>
      
      {isOpen && (
        <div className="chatOverlay" onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div className="chatWindow">
            <div className="chatHeader">
              <button className="closeButton" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>
            <div className="chatContent">
              <PythonWS simplified={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatButton;
