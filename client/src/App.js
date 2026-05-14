import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

import ArtisanDetail from "./pages/ArtisanDetail";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisans/:id" element={<ArtisanDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
