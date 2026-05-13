import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

export default function Home() {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/artisans")
      .then((response) => {
        setArtisans(response.data);
        setError("");
      })
      .catch((requestError) => {
        console.error(requestError);
        setError("Impossible de charger les artisans.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Trouve ton artisan</h1>

      {error ? <p className="text-danger">{error}</p> : null}

      <div className="row">
        {artisans.map((artisan) => (
          <div className="col-md-4 mb-4" key={artisan.id}>
            <div className="card h-100">
              <div className="card-body">
                <h3>{artisan.name}</h3>
                <p>{artisan.specialty}</p>
                <p>{artisan.city}</p>
                <p>* {artisan.rating}</p>
                <Link
                  to={`/artisans/${artisan.id}`}
                  className="btn btn-primary"
                >
                  Voir le profil
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
