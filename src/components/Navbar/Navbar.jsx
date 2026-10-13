import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Github, Linkedin, Menu, Moon, Sun, X } from "lucide-react";
import personal from "../../data/personal.js";
import useActiveSection from "../../hooks/useActiveSection.js";
import scrollToId from "../../utils/scroll.js";
import "./Navbar.css";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";
  const activeId = useActiveSection(onHome ? NAV_LINKS.map((l) => l.id) : []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) {
      scrollToId(id);
    } else {
      navigate("/");
      window.setTimeout(() => scrollToId(id), 50);
    }
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={handleNavClick("home")}>
          {personal.name}
        </Link>

        <nav className="navbar-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleNavClick(link.id)}
              className={activeId === link.id ? "active" : ""}
              aria-current={activeId === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <a
            href={personal.links.github}
            target="_blank"
            rel="noreferrer"
            className="icon-link"
            aria-label="GitHub profile"
          >
            <Github size={19} aria-hidden="true" />
          </a>
          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="icon-link"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={19} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="icon-link"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="icon-link menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`mobile-menu ${open ? "mobile-menu-open" : ""}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.id} href={`#${link.id}`} onClick={handleNavClick(link.id)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
