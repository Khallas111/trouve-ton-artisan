import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

export default function Home() {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    api
      .get("/artisans")
      .then((response) => {
        setArtisans(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSearch = artisan.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      artisan.Category?.id === Number(selectedCategory);

    return matchesSearch && matchesCategory;
  });
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Trouve ton artisan</h1>

      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un artisan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredArtisans.map((artisan) => (
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
