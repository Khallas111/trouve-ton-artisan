import ArtisanCard from "./ArtisanCard";

export default function TopArtisans({
  artisans,
  totalResults,
  search,
  selectedCategory,
}) {
  const hasActiveFilter = Boolean(search) || Boolean(selectedCategory);

  return (
    <section className="top-artisans">
      <div className="section-heading">
        <span className="section-marker section-marker--coral" />
        <h2>Ils sont au top!</h2>
      </div>

      <p className="section-copy">
        {hasActiveFilter
          ? `Selection de ${Math.min(artisans.length, totalResults)} artisan(s) selon vos filtres.`
          : "Voici les trois artisans du mois :"}
      </p>

      {artisans.length > 0 ? (
        <div className="artisan-grid">
          {artisans.map((artisan) => (
            <ArtisanCard artisan={artisan} key={artisan.id} />
          ))}
        </div>
      ) : (
        <div className="home-state">
          Aucun artisan ne correspond a la recherche en cours.
        </div>
      )}
    </section>
  );
}
