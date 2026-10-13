import { Award } from "lucide-react";
import certifications from "../../data/certifications.js";
import Section from "../shared/Section.jsx";
import "./Certifications.css";

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      {certifications.length === 0 ? (
        <div className="certs-empty">
          <Award size={20} aria-hidden="true" />
          <p>Certifications will be added as they are completed.</p>
        </div>
      ) : (
        <div className="certs-grid">
          {certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.credentialUrl || undefined}
              target={cert.credentialUrl ? "_blank" : undefined}
              rel={cert.credentialUrl ? "noreferrer" : undefined}
              className="cert-card"
            >
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
              <span>{cert.date}</span>
            </a>
          ))}
        </div>
      )}
    </Section>
  );
}
