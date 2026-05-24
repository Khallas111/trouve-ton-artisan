import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Seo from "../components/common/Seo";
import ArtisanCard from "../components/home/ArtisanCard";
import api from "../services/api";

function normalizeText(value) {
  return (value ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function Recherche() {
  const [searchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError("");

    api
      .get("/artisans")
      .then((response) => {
        if (isMounted) {
          setArtisans(response.data);
        }
      })
      .catch((fetchError) => {
        console.log(fetchError);

        if (isMounted) {
          setError("Impossible de charger les resultats de recherche pour le moment.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredArtisans = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());

    if (!normalizedQuery) {
      return [];
    }

    return artisans.filter((artisan) => {
      const searchableText = [
        artisan.name,
        artisan.specialty,
        artisan.city,
        artisan.Category?.name,
      ]
        .filter(Boolean)
        .map((value) => normalizeText(value))
        .join(" ");

      return searchableText.includes(normalizedQuery);
    });
  }, [artisans, query]);

  const sortedArtisans = useMemo(() => {
    return [...filteredArtisans].sort((firstArtisan, secondArtisan) => {
      const ratingDifference =
        (Number(secondArtisan.rating) || 0) - (Number(firstArtisan.rating) || 0);

      if (ratingDifference !== 0) {
        return ratingDifference;
      }

      return normalizeText(firstArtisan.name).localeCompare(
        normalizeText(secondArtisan.name),
        "fr",
      );
    });
  }, [filteredArtisans]);

  return (
    <section className="search-page">
      <Seo
        title={query.trim() ? `Recherche : ${query.trim()}` : "Recherche d'artisans"}
        description={
          query.trim()
            ? `Consultez les artisans correspondant a la recherche ${query.trim()} sur Trouve ton artisan.`
            : "Utilisez la recherche pour trouver un artisan selon votre besoin, votre metier ou votre ville."
        }
        noIndex
      />

      <div className="site-shell">
        <div className="search-page__panel">
          <div className="section-heading">
            <span className="section-marker section-marker--coral" />
            <h1>Recherche</h1>
          </div>

          <p className="section-copy search-page__summary">
            {query.trim()
              ? `${sortedArtisans.length} resultat(s) pour "${query.trim()}".`
              : "Saisissez un mot-cle dans la barre de recherche pour trouver un artisan."}
          </p>

          {error ? <p className="home-state home-state--error">{error}</p> : null}

          {!error && loading ? (
            <p className="home-state">Chargement des resultats...</p>
          ) : null}

          {!error && !loading && query.trim() && sortedArtisans.length > 0 ? (
            <div className="artisan-grid">
              {sortedArtisans.map((artisan) => (
                <ArtisanCard artisan={artisan} key={artisan.id} />
              ))}
            </div>
          ) : null}

          {!error && !loading && query.trim() && sortedArtisans.length === 0 ? (
            <div className="home-state">
              Aucun artisan ne correspond a votre recherche.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
