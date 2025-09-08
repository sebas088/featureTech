import React, { useEffect, useState } from "react";
import NavButton from "../NavButton/NavButton";
import Logo from "../Logo/Logo";
import './Header.css';

type HeaderProps = {
  // Referencia al header para medir su altura desde App
  innerRef: React.RefObject<HTMLElement | null>;
};

const Header: React.FC<HeaderProps> = ({ innerRef }) => {
  const [scrolled,setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cambia el estado si el usuario ha scrolleado mas de 50px
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // La clase "scrolled" se usa para aplicar estilos distintos al hacer scroll
    <header ref={innerRef} className={scrolled ? "scrolled" : ""}>
      <nav className={`navContainer ${scrolled ? "navScrolled" : ""}`}>
        
        <NavButton label="Home" to="home" />

        <div className="itemLogo">
          {/* Oculta el logo al hacer scroll con animacion suave */}
          <div className={`${scrolled ? "fade-out" : "fade-in"}`}>
            <Logo to="home" />
          </div>

          {/* Muestra el nombre de la empresa al hacer scroll, con efecto de aparicion/deslizamiento */}
          <h1 className={`brandName ${scrolled ? "fade-in slide-up" : "fade-out"}`}>
            Feature Tech<br />
            <span>DNS</span>
          </h1>
        </div>
        
        <NavButton label="Services" to="services" />
      </nav>
    </header>
  );
};

export default Header;
