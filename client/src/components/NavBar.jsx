import { FaBars, FaWallet } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [Mobile, setMobile] = useState(false);
  return (
    <>
      <nav className="navbar">
        <h3 className="logo">
          WalletGO
          <FaWallet color="#25b244" className="wallet-icon"></FaWallet>
        </h3>
        <ul
          className={Mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <Link to="/" className="home">
            <li>Home</li>
          </Link>
          <a href="#contact">
            <li>Contact</li>
          </a>
          <Link to="/Login" className="services">
            <li>Login</li>
          </Link>
          <Link to="/Signup" className="skills">
            <li>Signup</li>
          </Link>
        </ul>
        <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};
export default Navbar;
