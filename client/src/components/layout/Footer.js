import { Link } from "react-router-dom";
import logo from "../../assets/logos/Logo.png";
import telephoneIcon from "../../assets/icons/telephone(2).png";
import tramIcon from "../../assets/icons/tram(1).png";
import BubbleHandle from "../ui/BubbleHandle";

const footerLinks = [
  "Marchés publics",
  "Contact",
  "Mentions légales",
  "Données personnelles",
  "Politique des cookies",
  "Accessibilité",
  "Gestion des cookies",
  "Presse",
];

export default function Footer() {
  return (
    <footer className="site-footer" id="footer-navigation">
      <div className="site-shell">
        <div className="site-footer__panel">
          <BubbleHandle className="site-footer__bubble-handle" />
          <div className="site-footer__logo-row">
            <div className="site-footer__logo-cell">
              <Link to="/" className="site-footer__logo">
                <img src={logo} alt="Trouve ton artisan" />
              </Link>
            </div>
            <div className="site-footer__logo-spacer" aria-hidden="true" />
          </div>

          <div className="site-footer__content">
            <div className="site-footer__brand">
              <p>Conseil regional</p>
              <p>Auvergne-Rhone-Alpes</p>
            </div>

            <div className="site-footer__info">
              <div className="site-footer__contact">
                <h3>Lyon</h3>
                <p>
                  101 cours Charlemagne
                  <br />
                  CS 20033
                  <br />
                  69269 LYON CEDEX 02
                  <br />
                  France
                </p>
                <p>
                  Ouvert du lundi au vendredi de 8h15 a 17h
                  <br />
                  <span className="site-footer__contact-line">
                    <img
                      src={telephoneIcon}
                      alt=""
                      aria-hidden="true"
                      className="site-footer__icon"
                    />
                    <span>+33 (0)4 26 73 40 00</span>
                  </span>
                </p>
              </div>

              <div className="site-footer__contact">
                <p>
                  <span className="site-footer__contact-line">
                    <img
                      src={tramIcon}
                      alt=""
                      aria-hidden="true"
                      className="site-footer__icon"
                    />
                    <span>Tram T1 et T2 - Hotel de Region</span>
                  </span>
                  <br />
                  Metro A - Perrache
                </p>
                <p>Accueil telephonique du lundi au vendredi de 8h30 a 18h.</p>
              </div>
            </div>
          </div>

          <nav className="site-footer__links" aria-label="Liens du pied de page">
            {footerLinks.map((label) => (
              <Link key={label} to="/construction">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
