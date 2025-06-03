import { Link } from 'react-scroll';
import './NavButton.css';

interface NavButtonProps {
  label: string;
  to: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label, to }) => {
  return (
    <Link className='item btnContainer' to={to} smooth={true} duration={500}>
      {label}
    </Link>
  );
};

export default NavButton;
