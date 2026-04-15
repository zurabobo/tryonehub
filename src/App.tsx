import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Category from "./pages/Category";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contacts from "./pages/Contacts";
import FavoritesPage from "./pages/Favorites";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0f172a]">
        <Header />

        <main className="flex-1 px-0 md:px-[90px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
