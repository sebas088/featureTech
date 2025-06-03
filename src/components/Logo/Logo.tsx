import { Link } from "react-router-dom";
import logo from "../../assets/logoFeatureTech.png";
import './Logo.css'

interface LogoProps {
  to: string;
}

const Logo: React.FC<LogoProps> = ({to}) => {
  return (
    <Link to={to} className="itemLogo">
      <img src={logo} className="logo"></img>
    </Link>
  )
}

export default Logo
