import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { BiLogoGithub } from "react-icons/bi";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <a
          href="https://www.instagram.com/juliocrm__/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiLogoInstagram />
        </a>
        <a
          href="https://twitter.com/Juliocrm_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiLogoTwitter />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiLogoFacebookSquare />
        </a>
        <a href="https://github.com/user-sysc" target="_blank">
          <BiLogoGithub />
        </a>
      </div>
      <p> &copy; 2024 Julio Ríos</p>
    </div>
  );
}

export default Footer;
