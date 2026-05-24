import { useEffect, useMemo, useRef, useState } from "react";

import Seo from "../common/Seo";
import ArtisanCard from "../home/ArtisanCard";
import api from "../../services/api";

const SORT_OPTIONS = [
  { id: "rating", label: "Note" },
  { id: "name-asc", label: "Ordre alphabetique A-Z" },
  { id: "name-desc", label: "Ordre alphabetique Z-A" },
  { id: "recent", label: "Plus recent" },
  { id: "nearest", label: "Plus proche de ma position" },
];

// Les coordonnees locales suffisent pour le jeu de donnees regional actuel
// et evitent d'ajouter une dependance externe juste pour le tri.
const CITY_COORDINATES = {
  "aix-les-bains": { latitude: 45.6885, longitude: 5.9156 },
  annecy: { latitude: 45.8992, longitude: 6.1294 },
  annonay: { latitude: 45.2397, longitude: 4.6707 },
  "bourg-en-bresse": { latitude: 46.2052, longitude: 5.2258 },
  chambery: { latitude: 45.5646, longitude: 5.9178 },
  chamonix: { latitude: 45.9237, longitude: 6.8694 },
  evian: { latitude: 46.4011, longitude: 6.5879 },
  "le puy-en-velay": { latitude: 45.0437, longitude: 3.8852 },
  lyon: { latitude: 45.764, longitude: 4.8357 },
  montelimar: { latitude: 44.558, longitude: 4.7508 },
  "romans-sur-isere": { latitude: 45.0469, longitude: 5.0516 },
  "saint-priest": { latitude: 45.6974, longitude: 4.9439 },
  valence: { latitude: 44.9334, longitude: 4.8924 },
  vienne: { latitude: 45.5257, longitude: 4.8748 },
};

function normalizeText(value) {
  return (value ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function compareNames(firstValue, secondValue) {
  return (firstValue ?? "").localeCompare(secondValue ?? "", "fr", {
    sensitivity: "base",
  });
}

function getDistanceInKilometers(firstPoint, secondPoint) {
  const earthRadius = 6371;
  const latitudeDelta =
    ((secondPoint.latitude - firstPoint.latitude) * Math.PI) / 180;
  const longitudeDelta =
    ((secondPoint.longitude - firstPoint.longitude) * Math.PI) / 180;
  const firstLatitude = (firstPoint.latitude * Math.PI) / 180;
  const secondLatitude = (secondPoint.latitude * Math.PI) / 180;

  const haversineValue =
    Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
    Math.cos(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.sin(longitudeDelta / 2) *
      Math.sin(longitudeDelta / 2);

  const angularDistance =
    2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

  return earthRadius * angularDistance;
}

export default function CategoryArtisansPage({
  title,
  description,
  categoryName,
}) {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("rating");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [locationError, setLocationError] = useState("");
  const sortMenuRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    api
      .get("/artisans")
      .then((response) => {
        if (!isMounted) {
          return;
        }

        setArtisans(response.data);
      })
      .catch((fetchError) => {
        console.log(fetchError);

        if (!isMounted) {
          return;
        }

        setError("Impossible de charger les artisans pour le moment.");
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

  useEffect(() => {
    if (!isSortMenuOpen) {
      return undefined;
    }

    // Ferme le menu deroulant si l'utilisateur clique en dehors.
    const handlePointerDown = (event) => {
      if (!sortMenuRef.current?.contains(event.target)) {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isSortMenuOpen]);

  const matchingArtisans = useMemo(() => {
    const normalizedCategoryName = normalizeText(categoryName);

    return artisans.filter((artisan) => {
      return normalizeText(artisan.Category?.name) === normalizedCategoryName;
    });
  }, [artisans, categoryName]);

  const sortedArtisans = useMemo(() => {
    const artisansToSort = [...matchingArtisans];

    if (selectedSort === "name-asc") {
      return artisansToSort.sort((firstArtisan, secondArtisan) => {
        return compareNames(firstArtisan.name, secondArtisan.name);
      });
    }

    if (selectedSort === "name-desc") {
      return artisansToSort.sort((firstArtisan, secondArtisan) => {
        return compareNames(secondArtisan.name, firstArtisan.name);
      });
    }

    if (selectedSort === "recent") {
      return artisansToSort.sort((firstArtisan, secondArtisan) => {
        // On privilegie les vraies dates de creation quand elles existent,
        // puis on retombe sur l'id pour garder un ordre recent stable.
        const firstTimestamp =
          Date.parse(firstArtisan.createdAt ?? "") ||
          Number(firstArtisan.id) ||
          0;
        const secondTimestamp =
          Date.parse(secondArtisan.createdAt ?? "") ||
          Number(secondArtisan.id) ||
          0;

        return secondTimestamp - firstTimestamp;
      });
    }

    if (selectedSort === "nearest" && userPosition) {
      return artisansToSort.sort((firstArtisan, secondArtisan) => {
        // Les villes inconnues sont poussees en fin de liste au lieu de bloquer le tri.
        const firstCoordinates =
          CITY_COORDINATES[normalizeText(firstArtisan.city)];
        const secondCoordinates =
          CITY_COORDINATES[normalizeText(secondArtisan.city)];
        const firstDistance = firstCoordinates
          ? getDistanceInKilometers(userPosition, firstCoordinates)
          : Number.POSITIVE_INFINITY;
        const secondDistance = secondCoordinates
          ? getDistanceInKilometers(userPosition, secondCoordinates)
          : Number.POSITIVE_INFINITY;

        if (firstDistance !== secondDistance) {
          return firstDistance - secondDistance;
        }

        return compareNames(firstArtisan.name, secondArtisan.name);
      });
    }

    return artisansToSort.sort((firstArtisan, secondArtisan) => {
      const ratingDifference =
        (Number(secondArtisan.rating) || 0) -
        (Number(firstArtisan.rating) || 0);

      if (ratingDifference !== 0) {
        return ratingDifference;
      }

      return compareNames(firstArtisan.name, secondArtisan.name);
    });
  }, [matchingArtisans, selectedSort, userPosition]);

  const currentSortLabel =
    SORT_OPTIONS.find((sortOption) => sortOption.id === selectedSort)?.label ??
    SORT_OPTIONS[0].label;

  const handleSortSelection = (sortId) => {
    setSelectedSort(sortId);
    setIsSortMenuOpen(false);
    setLocationError("");

    if (sortId !== "nearest" || userPosition) {
      return;
    }

    // Le tri "proximite" est le seul qui depend des permissions du navigateur.
    if (!navigator.geolocation) {
      setLocationError(
        "Le tri par proximite n'est pas disponible sur cet appareil. Les artisans restent tries par note.",
      );
      setSelectedSort("rating");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setLocationError(
          "L'acces a votre position a ete refuse. Les artisans restent tries par note.",
        );
        setSelectedSort("rating");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  return (
    <section className="category-page">
      <Seo
        title={`${title} en Auvergne-Rhone-Alpes`}
        description={description}
        canonicalPath={`/${normalizeText(title)}`}
      />

      <div className="site-shell">
        <div className="category-page__panel">
          <div className="category-page__intro">
            <div className="section-heading">
              <span className="section-marker section-marker--coral" />
              <h1>{title}</h1>
            </div>
            <p className="section-copy">{description}</p>
          </div>

          {error ? (
            <p className="home-state home-state--error">{error}</p>
          ) : null}

          {!error && loading ? (
            <p className="home-state">Chargement des artisans...</p>
          ) : (
            <section className="top-artisans category-page__results">
              <div className="section-heading">
                <span className="section-marker section-marker--green" />
                <h2>Artisans de la categorie {title}</h2>
              </div>

              <div className="category-page__results-bar">
                <p className="section-copy category-page__results-count">
                  {matchingArtisans.length} artisan(s) disponible(s) dans cette
                  categorie.
                </p>

                <div className="category-sort" ref={sortMenuRef}>
                  <button
                    type="button"
                    className="category-sort__toggle"
                    aria-expanded={isSortMenuOpen}
                    aria-controls={`category-sort-menu-${normalizeText(title)}`}
                    onClick={() =>
                      setIsSortMenuOpen((currentState) => !currentState)
                    }
                  >
                    <span className="category-sort__label">Trier par :</span>
                    <span>{currentSortLabel}</span>
                  </button>

                  {isSortMenuOpen ? (
                    <div
                      className="category-sort__menu"
                      id={`category-sort-menu-${normalizeText(title)}`}
                      role="menu"
                    >
                      {SORT_OPTIONS.map((sortOption) => (
                        <button
                          key={sortOption.id}
                          type="button"
                          className={
                            sortOption.id === selectedSort
                              ? "category-sort__option is-active"
                              : "category-sort__option"
                          }
                          onClick={() => handleSortSelection(sortOption.id)}
                        >
                          {sortOption.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              {locationError ? (
                <p className="category-page__sort-feedback">{locationError}</p>
              ) : null}

              {sortedArtisans.length > 0 ? (
                <div className="artisan-grid">
                  {sortedArtisans.map((artisan) => (
                    <ArtisanCard artisan={artisan} key={artisan.id} />
                  ))}
                </div>
              ) : (
                <div className="home-state">
                  Aucun artisan n'est disponible pour la categorie {title} pour
                  le moment.
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
