import { Download, Github, Linkedin, Mail } from "lucide-react";
import personal from "../../data/personal.js";
import useResumeAvailable from "../../hooks/useResumeAvailable.js";
import scrollToId from "../../utils/scroll.js";
import "./Hero.css";

export default function Hero() {
  const resumeAvailable = useResumeAvailable(personal.resumePath);
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-photo-wrapper">
          <div className="hero-photo">
            <img
              src={personal.photo}
              alt={personal.name}
              width={180}
              height={180}
              loading="eager"
            />
          </div>
        </div>
        <div className="hero-copy">
          <p className="hero-name">{personal.name}</p>
          <h1 className="hero-role">{personal.role}</h1>
          <p className="hero-headline">{personal.tagline}</p>
          <p className="hero-support">{personal.summary}</p>

          <div className="hero-actions">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("projects");
              }}
            >
              View Projects
            </a>
            <a
              href={resumeAvailable === false ? "#resume" : personal.resumePath}
              className="btn btn-outline"
              {...(resumeAvailable === false
                ? {
                    onClick: (e) => {
                      e.preventDefault();
                      scrollToId("resume");
                    },
                  }
                : { download: true })}
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
          </div>

          <div className="hero-secondary-links">
            <a href={personal.links.github} target="_blank" rel="noreferrer">
              <Github size={16} aria-hidden="true" /> GitHub
            </a>
            <a href={personal.links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} aria-hidden="true" /> LinkedIn
            </a>
            <a href={`mailto:${personal.email}`}>
              <Mail size={16} aria-hidden="true" /> Email
            </a>
          </div>
        </div>

        <div className="hero-stack" aria-label="Core technologies">
          <div className="hero-stack-line" aria-hidden="true" />
          {personal.stack.map((item) => (
            <div className="hero-stack-item" key={item}>
              <span className="hero-stack-dot" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
