import "./Section.css";

export default function Section({ id, title, subtitle, inset = false, children, className = "" }) {
  return (
    <section id={id} className={`section ${inset ? "section-inset" : ""} ${className}`.trim()}>
      <div className="container">
        {title && (
          <header className="section-header">
            <h2>{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
