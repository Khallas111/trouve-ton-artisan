import { Link } from "react-router-dom";

import Seo from "../components/common/Seo";
import errorIllustration from "../assets/illustrations/Img-404.png";

export default function NotFoundPage() {
  return (
    <section className="search-page search-page--not-found">
      <Seo
        title="Page introuvable"
        description="La page demandee est introuvable. Revenez a l'accueil pour retrouver un artisan."
        noIndex
      />

      <div className="search-page__not-found-background">
        <img
          className="search-page__illustration search-page__illustration--full"
          src={errorIllustration}
          alt="Illustration de la page 404"
        />
      </div>

      <div className="site-shell search-page__not-found-shell">
        <div className="search-page__not-found-layout">
          <div className="home-state search-page__not-found-message">
            Vous pouvez revenir a l'accueil ou relancer une recherche pour retrouver un artisan.
          </div>

          <div className="search-page__actions">
            <Link className="search-page__home-link" to="/">
              Retour a l'accueil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
