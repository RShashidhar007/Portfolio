import education from "../../data/education.js";
import Section from "../shared/Section.jsx";
import "./Education.css";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="education-card">
        <h3>{education.degree}</h3>
        <p className="education-institution">
          {education.institution} · {education.university}
        </p>
        <div className="education-meta">
          <span>{education.period}</span>
          <span className="education-dot" aria-hidden="true">•</span>
          <span>CGPA: {education.cgpa}</span>
        </div>
      </div>
    </Section>
  );
}
