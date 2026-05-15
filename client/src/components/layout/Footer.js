import { Link } from "react-router-dom";
import logo from "../../assets/logos/Logo.png";

export default function Footer() {
  return (
    <footer className="site-footer" id="footer-navigation">
      <div className="site-shell">
        <div className="site-footer__panel">
          <div className="site-footer__grid">
            <div className="site-footer__brand">
              <Link to="/" className="site-footer__logo">
                <img src={logo} alt="Trouve ton artisan" />
              </Link>
              <p>
                Conseil regional
                <br />
                Auvergne Rhone Alpes
              </p>
            </div>

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
                +33 (0)4 26 73 40 00
              </p>
            </div>

            <div className="site-footer__contact">
              <h3>Acces</h3>
              <p>
                Tram T1 et T2 - Hotel de Region
                <br />
                Metro A - Perrache
              </p>
              <p>
                Accueil telephonique du lundi au vendredi de 8h30 a 18h.
              </p>
            </div>
          </div>

          <nav className="site-footer__links" aria-label="Liens du pied de page">
            <Link to="/">Marches publics</Link>
            <Link to="/">Contact</Link>
            <Link to="/">Mentions legales</Link>
            <Link to="/">Donnees personnelles</Link>
            <Link to="/">Politique des cookies</Link>
            <Link to="/">Accessibilite</Link>
            <Link to="/">Gestion des cookies</Link>
            <Link to="/">Presse</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
