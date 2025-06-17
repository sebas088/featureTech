import { Link } from "react-router-dom"; // Permite navegacion sin recargar la pagina
import logo from "../../assets/logoFeatureTech.png"; // Imagen del logo
import './Logo.css'

interface LogoProps {
  to: string; // Ruta de navegacion cuando se hace clic en el logo
}

// Componente reutilizable para mostrar el logo con texto, como enlace de navegacion
const Logo: React.FC<LogoProps> = ({to}) => {
  return (
    // Link permite que el logo actue como boton de navegacion
    <Link to={to} className="itemLogo">
      <div className="logoContent">
        <img src={logo} alt="Feature Tech logo" className="logo"></img>

        {/* Se muestra el nombte de la empresa debajo del logo */}
        <span className="companyName">Feature Tech<br />
          <span className="dns">DNS</span>
        </span>
      </div>
    </Link>
  )
}

export default Logo
