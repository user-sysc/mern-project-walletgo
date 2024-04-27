import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaWallet } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import "../styles/navbar.css";

const Navbar = () => {
  const [Mobile, setMobile] = useState(false);
  return (
    <>
      <nav className="navbar">
        <h3 className="logo">
          Wallet GO
          <FaWallet color="#25b244" className="wallet-icon"></FaWallet>
        </h3>
        {/*
        if large screen ma xa bhane Mobile add huxa
        if mobile screen ma xa bhane nav-links-mobile add huxa
        */}
        <ul
          className={Mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <Link to="/" className="home">
            <li>Home</li>
          </Link>
          <Link to="/Contact" className="about">
            <li>Contact</li>
          </Link>
          <Link to="/Login" className="services">
            <li>Login</li>
          </Link>
          <Link to="/Signup" className="skills">
            <li>Signup</li>
          </Link>
        </ul>
        {/* 
        whenever we click on button = setMobile(!Mobile) ==  is mobile oppsite to setMobile 
        */}
        <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};
export default Navbar;
