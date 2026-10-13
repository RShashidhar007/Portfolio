import { codingTopics, codingProfiles } from "../../data/coding.js";
import Section from "../shared/Section.jsx";
import "./Coding.css";

export default function Coding() {
  return (
    <Section id="problem-solving" title="Problem Solving" subtitle="Java & SQL fundamentals I practice regularly.">
      <div className="coding-grid">
        <div className="coding-card">
          <h3>Java & DSA</h3>
          <ul className="coding-topics">
            {codingTopics.java.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="coding-card">
          <h3>SQL</h3>
          <ul className="coding-topics">
            {codingTopics.sql.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {codingProfiles.length > 0 && (
        <div className="coding-profiles">
          {codingProfiles.map((p) => (
            <a key={p.platform} href={p.url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
              {p.platform}
            </a>
          ))}
        </div>
      )}
    </Section>
  );
}
