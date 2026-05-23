import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import alimentationImage from "../assets/images/Alimentation.jpg";
import batimentImage from "../assets/images/Bâtiment.jpg";
import boulangerImage from "../assets/images/Boulanger.png";
import menuisierImage from "../assets/images/Menuisier.png";
import serviceImage from "../assets/images/Service.jpg";
import servicesImage from "../assets/images/Services.png";
import api from "../services/api";

function normalizeText(value) {
  return (value ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getArtisanPortrait(artisan) {
  const specialty = normalizeText(artisan.specialty);
  const category = normalizeText(artisan.Category?.name);

  if (specialty.includes("boulang")) {
    return boulangerImage;
  }

  if (specialty.includes("menuis")) {
    return menuisierImage;
  }

  if (category.includes("aliment")) {
    return alimentationImage;
  }

  if (category.includes("batiment")) {
    return batimentImage;
  }

  if (category.includes("service")) {
    return servicesImage;
  }

  return serviceImage;
}

function Star({ fillRatio, gradientId }) {
  const normalizedFillRatio = Math.max(0, Math.min(1, fillRatio));
  const fillPercent = `${normalizedFillRatio * 100}%`;
  const className =
    normalizedFillRatio >= 1 ? "artisan-detail__star is-filled" : "artisan-detail__star";

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {normalizedFillRatio > 0 && normalizedFillRatio < 1 ? (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={fillPercent} stopColor="var(--primary-color)" />
            <stop offset={fillPercent} stopColor="rgba(0, 116, 199, 0.24)" />
          </linearGradient>
        </defs>
      ) : null}
      <path d="M12 2L14.94 8.13L21.7 9.11L16.85 13.84L18 20.5L12 17.27L6 20.5L7.15 13.84L2.3 9.11L9.06 8.13L12 2Z" />
      <path
        fill={
          normalizedFillRatio > 0 && normalizedFillRatio < 1
            ? `url(#${gradientId})`
            : undefined
        }
        d="M12 2L14.94 8.13L21.7 9.11L16.85 13.84L18 20.5L12 17.27L6 20.5L7.15 13.84L2.3 9.11L9.06 8.13L12 2Z"
      />
    </svg>
  );
}

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleContactSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError("");

    api
      .get(`/artisans/${id}`)
      .then((response) => {
        if (isMounted) {
          setArtisan(response.data);
        }
      })
      .catch((requestError) => {
        console.log(requestError);

        if (isMounted) {
          setError("Impossible de charger la fiche artisan pour le moment.");
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
  }, [id]);

  const normalizedRating = Math.max(0, Math.min(5, Number(artisan?.rating) || 0));
  const portrait = useMemo(() => {
    if (!artisan) {
      return serviceImage;
    }

    return getArtisanPortrait(artisan);
  }, [artisan]);

  if (loading) {
    return (
      <section className="artisan-detail-page">
        <div className="site-shell">
          <p className="home-state">Chargement de la fiche artisan...</p>
        </div>
      </section>
    );
  }

  if (error || !artisan) {
    return (
      <section className="artisan-detail-page">
        <div className="site-shell">
          <p className="home-state home-state--error">
            {error || "Artisan introuvable."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="artisan-detail-page">
      <div className="site-shell">
        <article className="artisan-detail">
          <div className="artisan-detail__hero">
            <div className="artisan-detail__portrait-frame">
              <img
                src={portrait}
                alt={`Portrait de ${artisan.name}`}
                className="artisan-detail__portrait"
              />
            </div>

            <h1>{artisan.name}</h1>
            <p className="artisan-detail__specialty">
              {artisan.specialty || artisan.Category?.name || "Profession"}
            </p>

            <div
              className="artisan-detail__rating"
              role="img"
              aria-label={`Note ${normalizedRating.toFixed(1)} sur 5`}
            >
              <div className="artisan-detail__stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={`detail-star-${index + 1}`}
                    fillRatio={normalizedRating - index}
                    gradientId={`detail-star-${artisan.id}-${index + 1}`}
                  />
                ))}
                <span>{normalizedRating.toFixed(1)}</span>
              </div>
            </div>

            <div className="artisan-detail__meta">
              <p>{artisan.Category?.name || "Artisan recommande"}</p>
              <p>{artisan.city || "Auvergne-Rhone-Alpes"}</p>
              {artisan.email ? <p>{artisan.email}</p> : null}
            </div>
          </div>

          <div className="artisan-detail__body">
            <p className="artisan-detail__about">
              {artisan.about ||
                "Cet artisan vous accompagne avec un savoir-faire reconnu et une attention particuliere portee a la qualite du service."}
            </p>

            {artisan.website ? (
              <a
                className="artisan-detail__website"
                href={artisan.website}
                target="_blank"
                rel="noreferrer"
              >
                {artisan.website}
              </a>
            ) : null}

            <form className="artisan-detail__form" onSubmit={handleContactSubmit}>
              <label className="artisan-detail__field">
                <span>Nom</span>
                <input type="text" placeholder="Entrez votre Nom" />
              </label>

              <label className="artisan-detail__field">
                <span>Email</span>
                <input type="email" placeholder="Entrez votre Email" />
              </label>

              <label className="artisan-detail__field">
                <span>Objet</span>
                <input type="text" placeholder="Entrez l'Objet du message" />
              </label>

              <label className="artisan-detail__field artisan-detail__field--message">
                <span>Message</span>
                <textarea placeholder="Votre message" rows="7" />
              </label>

              <div className="artisan-detail__actions">
                <button type="submit">Envoyer</button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}
