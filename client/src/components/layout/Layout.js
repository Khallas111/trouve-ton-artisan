import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
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
