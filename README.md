# R. Shashidhar — Portfolio

Java Full Stack Developer | AI/ML Engineer. A React + Vite single-page portfolio with per-project case-study pages.

## Features
- Sections: Hero, About, Skills, Projects (featured/all), Experience, How I Build, Problem Solving, Education, Certifications, GitHub, Resume, Contact, Footer
- Project case-study pages at `/projects/:id`
- Dark/light theme (system preference first, saved in localStorage)
- "Ask My Portfolio" assistant widget with graceful fallback when unconfigured
- Accessible nav, skip link, reduced-motion support, SEO/Open Graph, robots.txt, sitemap.xml
- All content lives in `src/data/` — no fake stats, metrics or certificates

## Tech Stack
React 18, Vite 5, React Router 6, Lucide React, plain CSS.

## Project Structure
```
src/
  components/   Navbar, Hero, About, Skills, Projects, Experience, Architecture,
                Coding, Education, Certifications, GitHubSection, Resume,
                Contact, PortfolioAssistant, Footer, shared
  pages/        Home, ProjectDetails
  data/         personal, skills, projects, experience, education,
                certifications, coding, architecture
  hooks/        useTheme, useActiveSection, useResumeAvailable
  utils/        scroll
  styles/       theme.css (tokens), globals.css
public/         favicon, robots.txt, sitemap.xml, projects/<id>/ (screenshots)
```

## Installation & Running
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the build locally
```

## Environment Variables
Copy `.env.example` to `.env`:
- `VITE_ASSISTANT_API_URL` — POST endpoint receiving `{ question }` and returning `{ answer }`. Unset = fallback message.
- `VITE_CONTACT_FORM_ENDPOINT` — optional form backend. Unset = mailto fallback.

Never put secret API keys in `VITE_*` variables; they are public in the built bundle.

## Deployment
Deploy `dist/` to Netlify, Vercel, Cloudflare Pages or GitHub Pages. Configure an SPA fallback (all paths -> `index.html`) so `/projects/:id` works on refresh (Netlify: `_redirects` with `/* /index.html 200`; Vercel: a rewrite).
Update the absolute URLs in `sitemap.xml`/`robots.txt` and add `public/og-image.png` (1200x630) for link previews.

## Adding Projects
Append an object to `src/data/projects.js` (same shape as existing ones). Put screenshots in `public/projects/<folder>/`.
Set `liveDemo` only to a real URL; `github: null` hides the button.

## Adding Certifications
Add entries to `src/data/certifications.js` (shape documented in the file). The section shows a placeholder until then.

## Updating Resume
Place your PDF at `public/resume.pdf` (path configurable via `resumePath` in `src/data/personal.js`). Until it exists, the site shows a fallback instead of a broken link.

## Configuring the AI Assistant
Build a small backend (e.g. Spring Boot or FastAPI) that loads the portfolio data, calls an LLM with a system prompt restricting answers to that data, and returns `{ answer }`. Keep the LLM key server-side and set `VITE_ASSISTANT_API_URL` to that endpoint.
