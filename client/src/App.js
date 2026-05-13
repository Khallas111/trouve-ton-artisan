import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import ArtisanDetail from "./pages/ArtisanDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans/:id" element={<ArtisanDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
