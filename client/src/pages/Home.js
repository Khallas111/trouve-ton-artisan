import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Seo from "../components/common/Seo";
import StepsSection from "../components/home/StepsSection";
import TopArtisans from "../components/home/TopArtisans";
import api from "../services/api";

export default function Home() {
  const [searchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("q") ?? "";
  const selectedCategory = searchParams.get("category") ?? "";

  useEffect(() => {
    api
      .get("/artisans")
      .then((artisansResponse) => {
        setArtisans(artisansResponse.data);
      })
      .catch((fetchError) => {
        console.log(fetchError);
        setError("Impossible de charger les artisans pour le moment.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredArtisans = artisans.filter((artisan) => {
    const searchValue = search.trim().toLowerCase();
    const searchableText = [
      artisan.name,
      artisan.specialty,
      artisan.city,
      artisan.Category?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchValue === "" || searchableText.includes(searchValue);
    const matchesCategory =
      selectedCategory === "" ||
      artisan.Category?.id === Number(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const topArtisans = filteredArtisans.filter((artisan) => artisan.top);
  const featuredArtisansSource =
    topArtisans.length > 0 ? topArtisans : filteredArtisans;
  const featuredArtisans = [...featuredArtisansSource]
    .sort((firstArtisan, secondArtisan) => {
      return (secondArtisan.rating ?? 0) - (firstArtisan.rating ?? 0);
    })
    .slice(0, 3);

  return (
    <div className="home-page">
      <Seo
        title="Trouver un artisan en Auvergne-Rhone-Alpes"
        description="Trouvez rapidement un artisan de confiance en Auvergne-Rhone-Alpes selon votre categorie, votre ville et votre besoin."
        canonicalPath="/"
      />

      <div className="home-surface">
        <div className="site-shell">
          <h1 className="sr-only">Trouve ton artisan</h1>

          {error ? (
            <p className="home-state home-state--error">{error}</p>
          ) : null}

          {!error && loading ? (
            <p className="home-state">Chargement des artisans...</p>
          ) : (
            <>
              <StepsSection />
              <TopArtisans
                artisans={featuredArtisans}
                totalResults={filteredArtisans.length}
                search={search}
                selectedCategory={selectedCategory}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
