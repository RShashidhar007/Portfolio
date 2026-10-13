import { Github, Linkedin, Mail } from "lucide-react";
import personal from "../../data/personal.js";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{personal.name}</p>
          <p className="footer-role">{personal.role}</p>
        </div>
        <div className="footer-links">
          <a href={personal.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} aria-hidden="true" />
          </a>
          <a href={personal.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} aria-hidden="true" />
          </a>
          <a href={`mailto:${personal.email}`} aria-label="Email">
            <Mail size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="container">
        <p className="footer-copy">© 2026 {personal.name}</p>
      </div>
    </footer>
  );
}
