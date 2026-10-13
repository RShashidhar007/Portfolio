// Skill categories shown in the Skills section.
// No proficiency percentages by design — list only what is actually used.

export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    items: ["Java", "Python", "SQL", "JavaScript"],
  },
  {
    id: "backend",
    title: "Backend",
    items: ["Spring Boot", "Spring MVC", "Spring Data JPA", "REST APIs", "FastAPI"],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: ["React", "HTML", "CSS", "JavaScript", "Vite"],
  },
  {
    id: "databases",
    title: "Databases",
    items: ["Microsoft SQL Server", "MySQL", "PostgreSQL", "SQLite"],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Generative AI",
      "LLMs",
      "RAG",
      "Embeddings",
      "Vector Databases",
      "Prompt Engineering",
    ],
  },
  {
    id: "tools-devops",
    title: "Tools / DevOps",
    items: ["Git", "GitHub", "Docker", "Docker Compose", "Maven", "Postman"],
  },
];

export default skillCategories;
