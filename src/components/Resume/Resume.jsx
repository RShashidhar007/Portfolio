import { Download, Eye } from "lucide-react";
import personal from "../../data/personal.js";
import useResumeAvailable from "../../hooks/useResumeAvailable.js";
import Section from "../shared/Section.jsx";
import "./Resume.css";

export default function Resume() {
  const available = useResumeAvailable(personal.resumePath);

  return (
    <Section id="resume" title="Resume">
      <div className="resume-panel">
        <p className="resume-question">Interested in my experience and technical background?</p>

        {available === false ? (
          <p className="resume-fallback">
            The resume file isn't available yet at <code>{personal.resumePath}</code>. Add a PDF there to
            enable these buttons.
          </p>
        ) : (
          <div className="resume-actions">
            <a
              href={personal.resumePath}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              aria-disabled={available === null}
            >
              <Eye size={16} aria-hidden="true" /> View Resume
            </a>
            <a href={personal.resumePath} download className="btn btn-primary" aria-disabled={available === null}>
              <Download size={16} aria-hidden="true" /> Download Resume
            </a>
          </div>
        )}
      </div>
    </Section>
  );
}
