import { Github } from "lucide-react";
import projects from "../../data/projects.js";
import personal from "../../data/personal.js";
import Section from "../shared/Section.jsx";
import "./GitHubSection.css";

export default function GitHubSection() {
  const repos = projects.filter((p) => p.github);

  return (
    <Section id="github" title="GitHub" subtitle="Public repositories for the projects above." inset>
      <div className="github-grid">
        {repos.map((repo) => (
          <a key={repo.id} href={repo.github} target="_blank" rel="noreferrer" className="github-card">
            <div className="github-card-head">
              <Github size={16} aria-hidden="true" />
              <h3>{repo.title}</h3>
            </div>
            <p>{repo.tagline}</p>
            <span className="github-card-tech">
              {[...(repo.stack.backend || []), ...(repo.stack.frontend || [])].slice(0, 3).join(" · ")}
            </span>
          </a>
        ))}
      </div>
      <a href={personal.links.github} target="_blank" rel="noreferrer" className="github-profile-link">
        See all repositories on GitHub →
      </a>
    </Section>
  );
}
