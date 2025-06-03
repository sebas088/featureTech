import React from "react";
import NavButton from "../NavButton/NavButton";
import Logo from "../Logo/Logo";
import './Header.css';

const Header: React.FC = () => {
  return (
    <header>
        <nav className="navContainer">
            <NavButton label="Home" to="home"/>
            <NavButton label="Services" to="services"/>
            <Logo to="home"/>
            <NavButton label="Portfolio" to="portfolio"/>
            <NavButton label="Contact" to="contact"/>
        </nav>
    </header>
  );
};

export default Header;
