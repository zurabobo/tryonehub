// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Header from "./components/Header/Header";
// import Home from "./pages/Home";
// import Category from "./pages/Category";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Contacts from "./pages/Contacts";
// import FavoritesPage from "./pages/Favorites";
// import Footer from "./components/Footer/Footer";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// import { useThemeStore } from "./store/theme/theme.store";
// import CookieConsentModal from "./components/CookieConsent/CookieConsentModal";
// import GoogleAnalyticsLoader from "./components/ConsentLoaders/GoogleAnalyticsLoader";
// import MicrosoftClarityLoader from "./components/ConsentLoaders/MicrosoftClarityLoader";

// const App: React.FC = () => {
//   const theme = useThemeStore((s) => s.theme);

//   return (
//     <Router>
//       <ScrollToTop />
//       <GoogleAnalyticsLoader />
//       <MicrosoftClarityLoader />
//       <CookieConsentModal />
//       <div
//         className={`
//           min-h-screen flex flex-col transition-colors duration-300
//           ${theme === "dark"
//             ? "bg-[#0F172A] text-[#E5E7EB]"
//             : "bg-[#F8FAFC] text-[#0F172A]"
//           }
//         `}
//       >
//         <Header />

//         <main className="flex-1 px-0 md:px-[90px]">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/favorites" element={<FavoritesPage />} />
//             <Route path="/category/:category" element={<Category />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/privacy" element={<Privacy />} />
//             <Route path="/contacts" element={<Contacts />} />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Category from "./pages/Category";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contacts from "./pages/Contacts";
import FavoritesPage from "./pages/Favorites";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useThemeStore } from "./store/theme/theme.store";

import CookieConsentModal from "./components/CookieConsent/CookieConsentModal";
import GoogleAnalyticsLoader from "./components/ConsentLoaders/GoogleAnalyticsLoader";
import MicrosoftClarityLoader from "./components/ConsentLoaders/MicrosoftClarityLoader";

import LocaleSync from "./components/LocaleSync/LocaleSync";
import RootRedirect from "./pages/RootRedirect";

function AppLayout() {
  const theme = useThemeStore((s) => s.theme);

  return (
    <>
      <LocaleSync />

      <div
        className={`
          min-h-screen flex flex-col transition-colors duration-300
          ${
            theme === "dark"
              ? "bg-[#0F172A] text-[#E5E7EB]"
              : "bg-[#F8FAFC] text-[#0F172A]"
          }
        `}
      >
        <Header />

        <main className="flex-1 px-0 md:px-[90px]">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="category/:category" element={<Category />} />
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <GoogleAnalyticsLoader />
      <MicrosoftClarityLoader />
      <CookieConsentModal />

      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
};

export default App;