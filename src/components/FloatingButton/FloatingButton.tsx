import { forwardRef } from 'react';
import './FloatingButton.css';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(({ onClick }, ref) => {
  return (
    <button className="floatingButton" onClick={onClick} ref={ref}>
      Contact
    </button>
  );
}
);

export default FloatingButton;
