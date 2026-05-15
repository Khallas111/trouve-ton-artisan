import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import StepsSection from "../components/home/StepsSection";
import TopArtisans from "../components/home/TopArtisans";
import api from "../services/api";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("q") ?? "";
  const selectedCategory = searchParams.get("category") ?? "";

  useEffect(() => {
    Promise.all([api.get("/artisans"), api.get("/categories")])
      .then(([artisansResponse, categoriesResponse]) => {
        setArtisans(artisansResponse.data);
        setCategories(categoriesResponse.data);
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

  const handleCategoryChange = (categoryId) => {
    const nextParams = new URLSearchParams(searchParams);

    if (categoryId) {
      nextParams.set("category", categoryId);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams);
  };

  return (
    <div className="home-page">
      <section className="home-surface">
        <div className="site-shell">
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
      </section>
    </div>
  );
}
