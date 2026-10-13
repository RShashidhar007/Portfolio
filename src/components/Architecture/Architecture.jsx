import { buildProcess, architectureExamples } from "../../data/architecture.js";
import Section from "../shared/Section.jsx";
import "./Architecture.css";

export default function Architecture() {
  return (
    <Section id="architecture" title="How I Build" inset>
      <div className="scroll-x">
        <div className="build-pipeline">
          {buildProcess.map((step, i) => (
            <div className="build-step" key={step}>
              <span className="build-step-index">{String(i + 1).padStart(2, "0")}</span>
              <span>{step}</span>
              {i < buildProcess.length - 1 && <span className="build-step-arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="arch-examples">
        {architectureExamples.map((example) => (
          <div className="arch-example" key={example.id}>
            <h3>{example.title}</h3>
            <div className="scroll-x">
              <div className="arch-layers">
                {example.layers.map((layer, i) => (
                  <div className="arch-layer" key={layer}>
                    <span>{layer}</span>
                    {i < example.layers.length - 1 && (
                      <span className="arch-layer-arrow" aria-hidden="true">↓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
