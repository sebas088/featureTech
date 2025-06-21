import { Link } from 'react-scroll'; // Componente para navegacion con scroll animado
import './NavButton.css';

interface NavButtonProps {
  label: string;  // Texto que muestra el boton 
  to: string; // ID del elemento al que hara scroll
}

// Componente de boton de navegacion con scroll suave hacie una seccion especifica
const NavButton: React.FC<NavButtonProps> = ({ label, to }) => {
  return (
    <Link className='item btnContainer' to={to} smooth={true} duration={500}>
      {label}
    </Link>
  );
};

export default NavButton;
