import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logos/Logo.png";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="header-search__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("q") ?? "");
  }, [location.search]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextParams = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      nextParams.set("q", trimmedQuery);
    }

    if (location.pathname === "/") {
      const currentParams = new URLSearchParams(location.search);
      const category = currentParams.get("category");

      if (category) {
        nextParams.set("category", category);
      }
    }

    navigate({
      pathname: "/",
      search: nextParams.toString() ? `?${nextParams.toString()}` : "",
    });
  };

  return (
    <header className="site-header" id="top">
      <div className="site-shell">
        <div className="site-header__content">
          <Link to="/" className="brand-mark">
            <img src={logo} alt="Trouve ton artisan" />
          </Link>

          <form className="header-search" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="artisan-search">
              Rechercher un artisan
            </label>
            <input
              id="artisan-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher"
            />
            <button type="submit" aria-label="Lancer la recherche">
              <SearchIcon />
            </button>
          </form>

          <a className="header-menu" href="#footer-navigation">
            <span className="header-menu__lines" aria-hidden="true" />
            <span>Menu</span>
          </a>
        </div>
      </div>
    </header>
  );
}
