import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Alimentation from "./pages/Alimentation";
import ArtisanDetail from "./pages/ArtisanDetail";
import Bâtiment from "./pages/Bâtiment";
import Construction from "./pages/Construction";
import Fabrication from "./pages/Fabrication";
import NotFoundPage from "./pages/404";
import Home from "./pages/Home";
import Recherche from "./pages/Recherche";
import Services from "./pages/Services";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/batiment" element={<Bâtiment />} />
          <Route path="/alimentation" element={<Alimentation />} />
          <Route path="/fabrication" element={<Fabrication />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/services" element={<Services />} />
          <Route path="/artisans/:id" element={<ArtisanDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
