// Project content, written from an actual inspection of each repository
// (or, for Employee Support AI, from the internship context only — no
// public repository exists for it). Only implemented features are listed;
// anything not yet built is called out explicitly under "planned".
//
// To add a new project: append an object to this array following the
// same shape, then add screenshots under /public/projects/<id>/.

export const projects = [
  {
    id: "codeforge-ai",
    title: "CodeForge AI",
    tagline: "AI-powered recruitment & code intelligence platform",
    featured: true,
    github: "https://github.com/RShashidhar007/CodeForge-AI.git",
    liveDemo: null,
    description:
      "A platform for technical recruitment that pairs role-based candidate/recruiter/admin workflows with AI-assisted code analysis — semantic search, explanation, and review over indexed repositories.",
    problem:
      "Technical hiring pipelines are slow: reviewers manually read through candidate repositories to judge code quality, and there's no structured way to ask questions about a codebase during screening.",
    solution:
      "A Spring Boot backend exposes secure, role-scoped APIs for candidates, recruiters, and admins, and layers an AI service on top that indexes repositories, generates embeddings for code chunks, and answers natural-language questions about the code through an LLM.",
    stack: {
      backend: ["Java 17", "Spring Boot 3.2", "Spring Security", "Spring Data JPA", "WebFlux"],
      frontend: ["React 19", "TypeScript", "Vite"],
      database: ["Microsoft SQL Server", "Redis (caching)"],
      ai: ["OpenAI API (Java client)", "JSON-stored code embeddings for semantic search"],
      infra: ["Docker", "Docker Compose"],
    },
    database:
      "Microsoft SQL Server via Spring Data JPA, with Redis used as a caching layer (Jedis client). Hibernate DDL is managed manually rather than auto-generated.",
    aiIntegration:
      "Repository files are chunked and embedded, with the embedding vector stored as a JSON array on each code chunk record — semantic similarity is computed at the application layer rather than through a dedicated vector-index database. An OpenAI-backed service answers questions about the indexed code, and the codebase includes entities for a multi-agent task pipeline (planner, patch, approval, execution history) that the README describes as a 10-agent system; this is the layer with the most ongoing development.",
    features: {
      implemented: [
        "JWT-based authentication with three roles: Candidate, Recruiter, Admin",
        "Candidate and recruiter profile management with ownership checks",
        "Company directory management for recruiters",
        "Repository indexing and semantic code search backed by stored embeddings",
        "AI chat/analysis endpoints for asking questions about indexed code",
        "Redis caching and a Dockerized backend + frontend",
      ],
      planned: [
        "Full end-to-end multi-agent workflow (planner → coder → reviewer → tester) — the data model exists, but this is still an active work area",
        "Moving embeddings from JSON storage to a proper vector index for scale",
      ],
    },
    architecture: [
      "React (TypeScript) client",
      "Spring Boot REST API (auth, candidate, recruiter, admin)",
      "AI service layer (embeddings + OpenAI)",
      "Microsoft SQL Server + Redis",
    ],
    challenges: [
      "Converting an AI-heavy platform to a strongly-typed Java/Spring Boot backend without losing the flexibility that ad-hoc AI features usually rely on.",
      "Representing semantic search without a native vector-database extension — embeddings are stored as JSON and compared in application code.",
    ],
    futureImprovements: [
      "Adopt a proper vector store for embeddings as the indexed codebase grows.",
      "Finish wiring the multi-agent workflow entities into a fully automated pipeline.",
    ],
    screenshotsFolder: "codeforge",
  },

  {
    id: "employee-support-ai",
    title: "Employee Support AI Chatbot",
    tagline: "Enterprise employee-support assistant (internship project)",
    featured: true,
    github: null,
    liveDemo: null,
    description:
      "An enterprise employee-support assistant built during my AI Engineer internship at Baldota Group, intended to retrieve relevant internal information before generating a response rather than answering from a general-purpose model alone.",
    problem:
      "Employees repeatedly ask the same questions about HR policy, IT setup, and internal procedures, and routing every question to a human support desk doesn't scale.",
    solution:
      "A retrieval-augmented pipeline where an incoming employee question is used to search a knowledge base (HR policies, IT docs, SOPs, resolved tickets) before an LLM generates a grounded response, with a path to escalate to a human when retrieval confidence is low.",
    stack: {
      backend: ["Backend API (internal)"],
      frontend: ["React"],
      database: ["Vector database for retrieval"],
      ai: ["RAG pipeline", "Embeddings", "LLM"],
      infra: [],
    },
    database: "A vector database is used for retrieval over the internal knowledge base.",
    aiIntegration:
      "Retrieval-augmented generation: the employee's question is embedded, matched against the knowledge base, and the retrieved context is passed to an LLM to produce the final answer.",
    features: {
      implemented: [
        "Core RAG flow: question → retrieval → LLM response",
      ],
      planned: [
        "Ticket management integration",
        "Human escalation for low-confidence answers",
        "Broader knowledge-source coverage across HR, IT, and SOP documentation",
      ],
    },
    architecture: [
      "React client",
      "Backend API",
      "RAG pipeline",
      "Knowledge retrieval (vector search)",
      "LLM",
      "Response",
    ],
    challenges: [
      "This is an internal Baldota Group project, so implementation detail here is intentionally kept at a conceptual level rather than describing internal systems.",
    ],
    futureImprovements: [
      "Ticket management and human hand-off are the next planned pieces.",
    ],
    note: "This is an internship project at Baldota Group and is not open-sourced, so there is no public repository to link to.",
    screenshotsFolder: null,
  },

  {
    id: "campusinsight",
    title: "CampusInsight",
    tagline: "AI-powered smart campus analytics & early risk detection",
    featured: true,
    github:
      "https://github.com/RShashidhar007/AI-Powered-Smart-Campus-Analytics-Early-Risk-Detection-System.git",
    liveDemo: null,
    description:
      "A Streamlit analytics platform that classifies students into risk tiers from attendance, marks, assignments, and study-hour data, with separate faculty and student dashboards.",
    problem:
      "Faculty often notice a student is struggling only after grades have already slipped, with no early, data-driven signal across attendance, marks, and engagement.",
    solution:
      "A trained scikit-learn classifier scores each student as at-risk or on-track from their academic and engagement data, surfaced through role-aware dashboards — a full view for faculty/admin, and a read-only personal view for students.",
    stack: {
      backend: ["Python", "Streamlit"],
      frontend: ["Streamlit (server-rendered UI)"],
      database: ["SQLite", "CSV fallback"],
      ai: [
        "scikit-learn (classification + regression models)",
        "Groq API (Llama 3) for the in-app AI assistant",
      ],
      infra: [],
    },
    database:
      "SQLite (data/campus_analytics.db) with an automatic CSV fallback if the database is unavailable.",
    aiIntegration:
      "Two layers: (1) trained scikit-learn models for risk classification and marks/grade prediction, reported in the project's own documentation at roughly 92% classification accuracy; (2) a conversational assistant that calls the Groq API (Llama 3) with a compressed snapshot of the relevant database context appended to the prompt. This is a context-injected LLM assistant rather than a vector-database RAG pipeline. When no Groq API key is configured, the assistant shows setup instructions instead of failing.",
    features: {
      implemented: [
        "Dual-role authentication: faculty (hashed password) and students (login by USN)",
        "Risk classification (at-risk / on-track) from attendance, marks, assignments, and study hours",
        "Marks predictor and grade forecast using Linear/Random Forest/Gradient Boosting models",
        "Plotly dashboards: risk distribution, grade spread, attendance tiers, department comparisons",
        "PDF report generation",
        "In-app AI assistant (faculty and student variants) via the Groq API, with a graceful fallback when unconfigured",
      ],
      planned: [],
    },
    architecture: [
      "Streamlit UI (faculty + student portals)",
      "src/ (auth, data processing, ML models, AI agent)",
      "SQLite (with CSV fallback)",
      "scikit-learn models + Groq LLM API",
    ],
    challenges: [
      "Keeping predictions interpretable enough for faculty to trust and act on, not just accurate.",
      "Compressing database context enough to fit the Groq API's request-size limits while keeping the assistant's answers grounded.",
    ],
    futureImprovements: [
      "Move from SQLite to a server-grade database for multi-department deployment.",
      "Replace ad-hoc context compression with a proper retrieval layer.",
    ],
    screenshotsFolder: "campusinsight",
  },

  {
    id: "ironore-crm",
    title: "IronOre CRM",
    tagline: "AI-assisted CRM for iron ore & pellet product businesses",
    featured: true,
    github: "https://github.com/RShashidhar007/ironore-crm.git",
    liveDemo: null,
    description:
      "A domain-specific CRM for an iron ore and pellet products business, covering product catalog, order and inventory management, complaint tracking, and an AI chat assistant for customers.",
    problem:
      "Small industrial suppliers often run product catalogs, orders, and customer complaints across spreadsheets and phone calls, with no unified system and no way to answer routine customer questions automatically.",
    solution:
      "A FastAPI backend handles products, orders, inventory, and a three-tier complaint workflow, while a locally-run LLM (via Ollama) powers a chat assistant for customer queries, including voice input.",
    stack: {
      backend: ["Python", "FastAPI", "SQLAlchemy"],
      frontend: ["React"],
      database: ["Microsoft SQL Server (via pyodbc)"],
      ai: ["Ollama (Llama 3.2, local inference)"],
      infra: [],
    },
    database: "Microsoft SQL Server, accessed through pyodbc and SQLAlchemy.",
    aiIntegration:
      "The chat assistant runs against a locally-hosted Llama 3.2 model through Ollama rather than a cloud LLM API — natural-language customer queries are interpreted and answered directly by the model, with voice input supported in the UI. There is no vector-database retrieval step in the current implementation.",
    features: {
      implemented: [
        "Role-based logins: SuperAdmin, Admin, and Customer accounts",
        "Product catalog and inventory tracking with availability checks",
        "Order management with automatic inventory deduction",
        "Three-tier complaint tracking (Under Review → In Progress → Resolved) with logged root-cause notes",
        "AI chat assistant (Ollama / Llama 3.2) with voice input",
        "Audit logging of admin actions and customer search/query history",
      ],
      planned: [],
    },
    architecture: [
      "React client (chat widget + dashboards)",
      "FastAPI backend (auth, products, orders, complaints)",
      "Microsoft SQL Server",
      "Ollama (local Llama 3.2) for the chat assistant",
    ],
    note:
      "Note on stack: this project runs on a Python/FastAPI backend rather than Java/Spring Boot, while still using Microsoft SQL Server for storage.",
    challenges: [
      "Running the LLM locally (via Ollama) instead of a paid API, which constrains model size and response latency.",
      "Keeping inventory counts consistent as orders are accepted, edited, and cancelled.",
    ],
    futureImprovements: [
      "A Spring Boot port of the backend is a natural next step to bring this project in line with the rest of the Java stack.",
    ],
    screenshotsFolder: "ironore",
  },

  {
    id: "licenseiq",
    title: "LicenseIQ",
    tagline: "Software subscription & license management platform",
    featured: false,
    github: "https://github.com/RShashidhar007/LicenseIQ.git",
    liveDemo: null,
    description:
      "An enterprise software-asset management platform for tracking application inventories, subscriptions, license seats, and IT spend, with role-based access control.",
    problem:
      "IT teams lose track of which software licenses are active, who's using them, and when they renew — leading to duplicate purchases and unused, still-billed seats.",
    solution:
      "A FastAPI + MySQL backend centralizes the software catalog, subscriptions, and license seat assignments, with a React dashboard for spend, renewals, and utilization, plus a rule-based engine that flags optimization opportunities.",
    stack: {
      backend: ["Python", "FastAPI", "SQLAlchemy", "Alembic"],
      frontend: ["React", "Tailwind CSS"],
      database: ["MySQL"],
      ai: ["Rule-based recommendation engine (no LLM)"],
      infra: ["Docker"],
    },
    database: "MySQL, accessed via SQLAlchemy with Alembic migrations.",
    aiIntegration:
      "The project's \"AI Decision Intelligence\" module is a rule-based insight engine — it scans the database for duplicate software purchases, licenses tied to inactive employees, and underused subscriptions, and flags upcoming renewals with potential savings. There is no LLM or generative-AI integration in the current codebase, despite the project name.",
    features: {
      implemented: [
        "JWT authentication with refresh rotation and role-based access control",
        "Executive dashboard with spend, usage, and renewal KPIs",
        "Software catalog, subscription/contract tracking, and license seat assignment",
        "Employee directory with onboarding/offboarding-linked access",
        "Usage tracking to surface underutilized or shadow-IT software",
        "Financial reports and export",
        "Rule-based recommendations for cost savings and duplicate/underused licenses",
      ],
      planned: ["Notifications & alerting (email/Slack for renewals and thresholds)"],
    },
    architecture: [
      "React + Tailwind client",
      "FastAPI backend (auth, catalog, subscriptions, licenses, reports, AI insights)",
      "MySQL (SQLAlchemy + Alembic)",
    ],
    note:
      "Note on stack: this project runs on a Python/FastAPI backend with MySQL, rather than Java/Spring Boot.",
    challenges: [
      "Modeling subscriptions, seats, and renewals so the spend rollups stay accurate as contracts change mid-cycle.",
    ],
    futureImprovements: [
      "Add real notification delivery (email/Slack) for renewal and budget thresholds.",
      "Introduce genuine LLM-assisted recommendations alongside the current rule-based engine.",
    ],
    screenshotsFolder: "licenseiq",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProjectById = (id) => projects.find((p) => p.id === id);

export default projects;
