import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";

export default function ArtisanDetail() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    api
      .get(`/artisans/${id}`)
      .then((response) => {
        setArtisan(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!artisan) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="container mt-5">
      <h1>{artisan.name}</h1>

      <p>
        <strong>Spécialité :</strong> {artisan.specialty}
      </p>

      <p>
        <strong>Ville :</strong> {artisan.city}
      </p>

      <p>
        <strong>Note :</strong> ⭐ {artisan.rating}
      </p>

      <p>
        <strong>Catégorie :</strong> {artisan.Category?.name}
      </p>

      <p>{artisan.about}</p>

      <p>
        <strong>Email :</strong> {artisan.email}
      </p>

      <a href={artisan.website} target="_blank" rel="noreferrer">
        Voir le site web
      </a>
    </div>
  );
}
