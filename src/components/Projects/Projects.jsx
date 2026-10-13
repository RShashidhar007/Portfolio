import { useState } from "react";
import projects, { featuredProjects } from "../../data/projects.js";
import Section from "../shared/Section.jsx";
import ProjectCard from "./ProjectCard.jsx";
import "./Projects.css";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? projects : featuredProjects;

  return (
    <Section
      id="projects"
      title={showAll ? "All Projects" : "Featured Projects"}
      subtitle="Each project links to a case study describing what's actually implemented, not a marketing summary."
    >
      <div className="projects-grid">
        {list.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length > featuredProjects.length && (
        <div className="projects-toggle">
          <button type="button" className="btn btn-outline" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show Featured Only" : `View All Projects (${projects.length})`}
          </button>
        </div>
      )}
    </Section>
  );
}
