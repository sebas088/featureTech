import { Link } from "react-router-dom";
import logo from "../../assets/logoFeatureTech.png";
import './Logo.css'

interface LogoProps {
  to: string;
}

const Logo: React.FC<LogoProps> = ({to}) => {
  return (
    <Link to={to} className="itemLogo">
      <div className="logoContent">
        <img src={logo} alt="Feature Tech logo" className="logo"></img>
        <span className="companyName">Feature Tech<br />
          <span className="dns">DNS</span>
        </span>
      </div>
    </Link>
  )
}

export default Logo
