import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const stackPreview = [
    ...(project.stack.backend || []),
    ...(project.stack.frontend || []),
  ].slice(0, 4);

  return (
    <article className="project-card">
      <div className="project-card-top">
        <h3>{project.title}</h3>
        <p className="project-card-tagline">{project.tagline}</p>
      </div>

      <p className="project-card-desc">{project.description}</p>

      <ul className="project-card-stack">
        {stackPreview.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="project-card-actions">
        <Link to={`/projects/${project.id}`} className="btn btn-outline btn-sm">
          Case Study
        </Link>
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
            <Github size={15} aria-hidden="true" /> GitHub
          </a>
        )}
        {project.liveDemo && (
          <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
            <ArrowUpRight size={15} aria-hidden="true" /> Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
