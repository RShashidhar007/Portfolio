import experience from "../../data/experience.js";
import Section from "../shared/Section.jsx";
import "./Experience.css";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="experience-list">
        {experience.map((job) => (
          <article className="experience-item" key={job.id}>
            <div className="experience-meta">
              <span className="experience-period">{job.period}</span>
            </div>
            <div className="experience-body">
              <h3>{job.role}</h3>
              <p className="experience-company">
                {job.company} — {job.location}
              </p>
              <ul className="experience-focus">
                {job.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
