import { Link } from "react-router-dom";

import Seo from "../components/common/Seo";
import constructionIllustration from "../assets/illustrations/Construction.png";

export default function Construction() {
  return (
    <section className="search-page search-page--construction">
      <Seo
        title="Page en construction"
        description="Cette page est en cours de construction. Revenez bientot pour consulter son contenu."
        noIndex
        canonicalPath="/construction"
      />

      <div className="search-page__not-found-background">
        <img
          className="search-page__illustration search-page__illustration--full"
          src={constructionIllustration}
          alt="Illustration de la page Construction"
        />
      </div>

      <div className="site-shell search-page__not-found-shell">
        <div className="search-page__not-found-layout">
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
