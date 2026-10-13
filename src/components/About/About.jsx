import personal from "../../data/personal.js";
import Section from "../shared/Section.jsx";
import "./About.css";

export default function About() {
  const { about } = personal;
  return (
    <Section id="about" title="About">
      <div className="about-grid">
        <div className="about-text">
          <div className="about-photo">
            <img
              src={personal.photo}
              alt={personal.name}
              width={100}
              height={100}
              loading="lazy"
            />
          </div>
          {about.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <ul className="about-highlights">
          {about.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
