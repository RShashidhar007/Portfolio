import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, ImageOff } from "lucide-react";
import { getProjectById } from "../../data/projects.js";
import "./ProjectDetails.css";

function StackGroup({ label, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="stack-group">
      <span className="stack-group-label">{label}</span>
      <div className="stack-group-items">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();
  const project = getProjectById(id);

  if (!project) return <Navigate to="/" replace />;

  return (
    <article className="project-details">
      <div className="container">
        <Link to="/#projects" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" /> Back to Projects
        </Link>

        <header className="pd-hero">
          <p className="pd-tagline">{project.tagline}</p>
          <h1>{project.title}</h1>
          <p className="pd-description">{project.description}</p>

          {project.note && <p className="pd-note">{project.note}</p>}

          <div className="pd-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                <Github size={16} aria-hidden="true" /> GitHub
              </a>
            )}
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn btn-primary">
                <ArrowUpRight size={16} aria-hidden="true" /> Live Demo
              </a>
            )}
          </div>
        </header>

        <section className="pd-section">
          <h2>Overview</h2>
          <p>{project.description}</p>
        </section>

        <div className="pd-two-col">
          <section className="pd-section">
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </section>
          <section className="pd-section">
            <h2>Solution</h2>
            <p>{project.solution}</p>
          </section>
        </div>

        <section className="pd-section">
          <h2>Key Features</h2>
          <ul className="pd-feature-list">
            {project.features.implemented.map((f) => (
              <li key={f} className="is-implemented">
                {f}
              </li>
            ))}
          </ul>
          {project.features.planned.length > 0 && (
            <>
              <h3 className="pd-subheading">Planned / Not Yet Implemented</h3>
              <ul className="pd-feature-list">
                {project.features.planned.map((f) => (
                  <li key={f} className="is-planned">
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section className="pd-section">
          <h2>Technology Stack</h2>
          <div className="stack-groups">
            <StackGroup label="Backend" items={project.stack.backend} />
            <StackGroup label="Frontend" items={project.stack.frontend} />
            <StackGroup label="Database" items={project.stack.database} />
            <StackGroup label="AI" items={project.stack.ai} />
            <StackGroup label="Infra" items={project.stack.infra} />
          </div>
        </section>

        <section className="pd-section">
          <h2>Architecture</h2>
          <div className="scroll-x">
            <div className="pd-arch-flow">
              {project.architecture.map((layer, i) => (
                <span key={layer} className="pd-arch-step">
                  {layer}
                  {i < project.architecture.length - 1 && <span aria-hidden="true"> → </span>}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="pd-two-col">
          <section className="pd-section">
            <h2>Database</h2>
            <p>{project.database}</p>
          </section>
          <section className="pd-section">
            <h2>AI Integration</h2>
            <p>{project.aiIntegration}</p>
          </section>
        </div>

        <section className="pd-section">
          <h2>Screenshots</h2>
          <div className="pd-screenshots-empty">
            <ImageOff size={20} aria-hidden="true" />
            <p>Screenshots coming soon.</p>
          </div>
        </section>

        <div className="pd-two-col">
          <section className="pd-section">
            <h2>Challenges</h2>
            <ul className="pd-plain-list">
              {project.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
          <section className="pd-section">
            <h2>Future Improvements</h2>
            <ul className="pd-plain-list">
              {project.futureImprovements.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="pd-footer-actions">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
              <Github size={16} aria-hidden="true" /> View on GitHub
            </a>
          ) : (
            <p className="pd-note">No public repository for this project.</p>
          )}
          <Link to="/#projects" className="btn btn-ghost">
            <ArrowLeft size={15} aria-hidden="true" /> Back to all projects
          </Link>
        </div>
      </div>
    </article>
  );
}
