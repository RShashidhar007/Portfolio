import { useState } from "react";
import { CheckCircle2, Github, Linkedin, Mail } from "lucide-react";
import personal from "../../data/personal.js";
import Section from "../shared/Section.jsx";
import "./Contact.css";

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | success

  const handleChange = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (FORM_ENDPOINT) {
      try {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        setStatus("success");
      } catch {
        // Fall back to mailto if the configured endpoint fails.
        window.location.href = mailtoHref(values);
      }
    } else {
      window.location.href = mailtoHref(values);
      setStatus("success");
    }
  };

  const mailtoHref = (v) =>
    `mailto:${personal.email}?subject=${encodeURIComponent(`Portfolio contact from ${v.name}`)}&body=${encodeURIComponent(
      `${v.message}\n\n— ${v.name} (${v.email})`
    )}`;

  return (
    <Section id="contact" title="Let's Build Something Together">
      <div className="contact-grid">
        <div className="contact-links">
          <a href={`mailto:${personal.email}`} className="contact-link">
            <Mail size={17} aria-hidden="true" /> {personal.email}
          </a>
          <a href={personal.links.linkedin} target="_blank" rel="noreferrer" className="contact-link">
            <Linkedin size={17} aria-hidden="true" /> LinkedIn
          </a>
          <a href={personal.links.github} target="_blank" rel="noreferrer" className="contact-link">
            <Github size={17} aria-hidden="true" /> GitHub
          </a>
          {!FORM_ENDPOINT && (
            <p className="contact-note">
              This form opens your email client — no backend is configured yet.
            </p>
          )}
        </div>

        {status === "success" ? (
          <div className="contact-success">
            <CheckCircle2 size={22} aria-hidden="true" />
            <p>
              {FORM_ENDPOINT
                ? "Message sent — thanks for reaching out."
                : "Your email client should now be open with the message ready to send."}
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="form-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="form-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={handleChange("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span id="message-error" className="form-error">
                  {errors.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
