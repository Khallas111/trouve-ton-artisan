import { Link } from "react-router-dom";

import alimentationImage from "../../assets/images/Alimentation.jpg";
import batimentImage from "../../assets/images/Bâtiment.jpg";
import boulangerImage from "../../assets/images/Boulanger.png";
import menuisierImage from "../../assets/images/Menuisier.png";
import serviceImage from "../../assets/images/Service.jpg";
import servicesImage from "../../assets/images/Services.png";

function normalizeText(value) {
  return (value ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function Star({ fillRatio, gradientId }) {
  const normalizedFillRatio = Math.max(0, Math.min(1, fillRatio));
  const fillPercent = `${normalizedFillRatio * 100}%`;
  const className =
    normalizedFillRatio >= 1 ? "artisan-card__star is-filled" : "artisan-card__star";

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
            <stop offset={fillPercent} stopColor="rgba(56, 64, 80, 0.2)" />
          </linearGradient>
        </defs>
      ) : null}
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

function getVisualTheme(artisan) {
  const fingerprint = normalizeText(
    `${artisan.specialty ?? ""} ${artisan.Category?.name ?? ""}`,
  );

  if (fingerprint.includes("boul") || fingerprint.includes("aliment")) {
    return "amber";
  }

  if (fingerprint.includes("beaute") || fingerprint.includes("coiff")) {
    return "rose";
  }

  if (fingerprint.includes("batiment") || fingerprint.includes("couverture")) {
    return "slate";
  }

  if (fingerprint.includes("plomb") || fingerprint.includes("chauff")) {
    return "ocean";
  }

  return "teal";
}

function getArtisanVisual(artisan) {
  const specialty = normalizeText(artisan.specialty);
  const category = normalizeText(artisan.Category?.name);

  if (specialty.includes("boulang")) {
    return {
      src: boulangerImage,
      alt: `Illustration du metier ${artisan.specialty ?? artisan.name}`,
      position: "center top",
    };
  }

  if (specialty.includes("menuis")) {
    return {
      src: menuisierImage,
      alt: `Illustration du metier ${artisan.specialty ?? artisan.name}`,
      position: "center top",
    };
  }

  if (category.includes("aliment")) {
    return {
      src: alimentationImage,
      alt: `Illustration de la categorie ${artisan.Category?.name ?? "alimentation"}`,
      position: "center top",
    };
  }

  if (category.includes("batiment")) {
    return {
      src: batimentImage,
      alt: `Illustration de la categorie ${artisan.Category?.name ?? "batiment"}`,
      position: "center top",
    };
  }

  if (category.includes("service")) {
    return {
      src: servicesImage,
      alt: `Illustration de la categorie ${artisan.Category?.name ?? "services"}`,
      position: "center top",
    };
  }

  return {
    src: serviceImage,
    alt: `Illustration du metier ${artisan.specialty ?? artisan.name}`,
    position: "center top",
  };
}

export default function ArtisanCard({ artisan }) {
  const normalizedRating = Math.max(0, Math.min(5, Number(artisan.rating) || 0));
  const theme = getVisualTheme(artisan);
  const categoryName = artisan.Category?.name ?? "Artisan recommande";
  const visual = getArtisanVisual(artisan);

  return (
    <article className="artisan-card">
      <div className={`artisan-card__visual artisan-card__visual--${theme}`}>
        <img
          src={visual.src}
          alt={visual.alt}
          className="artisan-card__visual-image"
          loading="lazy"
          style={{ objectPosition: visual.position }}
        />
        <div className="artisan-card__visual-overlay" />
        <div className="artisan-card__visual-badge">{categoryName}</div>
      </div>

      <div className="artisan-card__content">
        <p className="artisan-card__eyebrow">{artisan.city}</p>
        <h3>{artisan.name}</h3>
        <p className="artisan-card__specialty">{artisan.specialty}</p>

        <div className="artisan-card__rating" aria-label={`Note ${artisan.rating ?? 0} sur 5`}>
          {Array.from({ length: 5 }, (_, index) => {
            const starFillRatio = normalizedRating - index;

            return (
              <Star
                key={`${artisan.id}-star-${index + 1}`}
                fillRatio={starFillRatio}
                gradientId={`artisan-star-${artisan.id}-${index + 1}`}
              />
            );
          })}
          <span>{normalizedRating.toFixed(1)}</span>
        </div>

        <p className="artisan-card__about">
          {artisan.about || "Un artisan selectionne pour la qualite de son accompagnement."}
        </p>

        <div className="artisan-card__actions">
          <Link to={`/artisans/${artisan.id}`}>En savoir plus</Link>
        </div>
      </div>
    </article>
  );
}
