import "../Styles/Footer.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <ul>
          <li>
            <Link to="Despre noi">Despre noi</Link>
          </li>
          <li>
            <Link to="/faq">Întrebări frecvente</Link>
          </li>
          <li>
            <Link to="Despre noi">Contact</Link>
          </li>
          <li>
            <Link to="Despre noi">Termeni și condiții</Link>
          </li>
          <li>
            <Link to="Despre noi">Politică de confidențialitate</Link>
          </li>
        </ul>
        <hr />
        <div className="links-wrapper">
          <p>Copyright © 2023. Toate drepturile rezervate de WEBSITENAME</p>
          <div>
            <i className="fi fi-brands-facebook"></i>
            <i className="fi fi-brands-instagram"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
