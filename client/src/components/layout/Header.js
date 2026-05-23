import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logos/Logo.png";

const navigationLinks = [
  { label: "Bâtiment", to: "/batiment" },
  { label: "Alimentation", to: "/alimentation" },
  { label: "Fabrication", to: "/fabrication" },
  { label: "Services", to: "/services" },
];

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("q") ?? "");
  }, [location.search]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextParams = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      nextParams.set("q", trimmedQuery);
    }

    navigate({
      pathname: "/recherche",
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

          <div className="header-menu">
            <button
              type="button"
              className="header-menu__toggle"
              aria-expanded={isMenuOpen}
              aria-controls="header-navigation-dropdown"
              onClick={() => setIsMenuOpen((currentState) => !currentState)}
            >
              <span className="header-menu__lines" aria-hidden="true" />
              <span>Menu</span>
            </button>

            {isMenuOpen ? (
              <nav
                className="header-menu__dropdown"
                id="header-navigation-dropdown"
                aria-label="Navigation des catégories"
              >
                {navigationLinks.map((link) => (
                  <Link key={link.to} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
