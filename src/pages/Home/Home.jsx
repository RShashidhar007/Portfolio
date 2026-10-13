import Hero from "../../components/Hero/Hero.jsx";
import About from "../../components/About/About.jsx";
import Skills from "../../components/Skills/Skills.jsx";
import Projects from "../../components/Projects/Projects.jsx";
import Experience from "../../components/Experience/Experience.jsx";
import Architecture from "../../components/Architecture/Architecture.jsx";
import Coding from "../../components/Coding/Coding.jsx";
import Education from "../../components/Education/Education.jsx";
import Certifications from "../../components/Certifications/Certifications.jsx";
import GitHubSection from "../../components/GitHubSection/GitHubSection.jsx";
import Resume from "../../components/Resume/Resume.jsx";
import Contact from "../../components/Contact/Contact.jsx";
import BackToTop from "../../components/shared/BackToTop.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Architecture />
      <Coding />
      <Education />
      <Certifications />
      <GitHubSection />
      <Resume />
      <Contact />
      <BackToTop />
    </>
  );
}
