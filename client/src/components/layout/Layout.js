import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // React Router conserve ici la position de scroll entre deux routes,
    // donc on la reinitialise explicitement pour repartir en haut de page.
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </>
  );
}
