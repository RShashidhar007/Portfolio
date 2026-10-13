import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PortfolioAssistant from "./components/PortfolioAssistant/PortfolioAssistant.jsx";
import Home from "./pages/Home/Home.jsx";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails.jsx";
import useTheme from "./hooks/useTheme.js";
import scrollToId from "./utils/scroll.js";

function ScrollToTopOnNavigate() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const timer = window.setTimeout(() => scrollToId(id), 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
    return undefined;
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <ScrollToTopOnNavigate />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </main>
      <Footer />
      <PortfolioAssistant />
    </>
  );
}
