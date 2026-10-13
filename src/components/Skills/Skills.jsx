import skillCategories from "../../data/skills.js";
import Section from "../shared/Section.jsx";
import "./Skills.css";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="Organized by where each tool actually shows up in my projects.">
      <div className="skills-grid">
        {skillCategories.map((cat) => (
          <div className="skills-card" key={cat.id}>
            <h3>{cat.title}</h3>
            <ul className="skills-badges">
              {cat.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
