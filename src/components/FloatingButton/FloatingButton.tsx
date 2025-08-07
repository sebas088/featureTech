import './FloatingButton.css';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton = ({ onClick }: FloatingButtonProps) => (
  <button className="floatingButton" onClick={onClick}>
    Contact
  </button>
);

export default FloatingButton;
