import React, { useEffect, useState } from "react";
import NavButton from "../NavButton/NavButton";
import Logo from "../Logo/Logo";
import './Header.css';

type HeaderProps = {
  innerRef: React.RefObject<HTMLElement | null>;
};

const Header: React.FC<HeaderProps> = ({ innerRef }) => {
  const [scrolled,setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={innerRef} className={scrolled ? "scrolled" : ""}>
      <nav className={`navContainer ${scrolled ? "navScrolled" : ""}`}>
        <NavButton label="Home" to="home" />
        <NavButton label="Services" to="services" />

        <div className="itemLogo">
          <div className={`${scrolled ? "fade-out" : "fade-in"}`}>
            <Logo to="home" />
          </div>
        
          <h1 className={`brandName ${scrolled ? "fade-in slide-up" : "fade-out"}`}>
            Feature Tech<br />
            <span>DNS</span>
          </h1>
        </div>
        
        <NavButton label="Portfolio" to="portfolio" />
        <NavButton label="Contact" to="contact" />
      </nav>
    </header>
  );
};

export default Header;
