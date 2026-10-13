import { useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import personal from "../../data/personal.js";
import "./PortfolioAssistant.css";

const ASSISTANT_API_URL = import.meta.env.VITE_ASSISTANT_API_URL || "http://localhost:3001/chat";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const EXAMPLE_QUESTIONS = [
  "What projects has Shashidhar built?",
  "What Java technologies does he know?",
  "Which projects use RAG?",
  "What kind of developer is Shashidhar?",
];

const FALLBACK_MESSAGE =
  "The AI assistant isn't configured yet. Add your Groq API key to .env to enable the assistant. " +
  "In the meantime, take a look at the Projects and Skills sections above, or reach out directly.";

const SYSTEM_PROMPT = `You are a helpful assistant for ${personal.name}'s portfolio website. You have detailed knowledge about his projects, experience, skills, and background. 

Your role is to answer questions about:
- His projects: ${personal.stack.join(", ")}
- His experience as a ${personal.role}
- His technical skills and stack
- His background and education
- How to contact him

Be concise, friendly, and professional. If asked something not about the portfolio, politely redirect to portfolio-related topics.`;

export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Hi, I'm ${personal.name.split(" ")[0]}'s portfolio assistant. Ask me about his projects, stack, or experience.`,
    },
  ]);
  const [sending, setSending] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState(new Set());
  const panelRef = useRef(null);

  // Get remaining questions that haven't been asked
  const getRemainingQuestions = () => {
    return EXAMPLE_QUESTIONS.filter((q) => !askedQuestions.has(q));
  };

  // Clear chat and reset state
  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: `Hi, I'm ${personal.name.split(" ")[0]}'s portfolio assistant. Ask me about his projects, stack, or experience.`,
      },
    ]);
    setAskedQuestions(new Set());
    setInput("");
  };

  const askQuestion = async (question) => {
    if (!question.trim()) return;
    
    // Track this question as asked
    setAskedQuestions((prev) => new Set(prev).add(question));
    
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");

    setSending(true);
    try {
      const res = await fetch(ASSISTANT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map((m) => ({
            role: m.role,
            content: m.text,
          })),
          systemPrompt: SYSTEM_PROMPT,
        }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Request failed");
      }
      
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch (err) {
      console.error("Assistant error:", err);
      setMessages((m) => [
        ...m,
        { 
          role: "assistant", 
          text: "Sorry, I couldn't process that. Please make sure the backend is running on http://localhost:3001, or try again later.",
          fallback: true 
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="assistant-fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="portfolio-assistant-panel"
        aria-label={open ? "Close portfolio assistant" : "Ask my portfolio"}
      >
        {open ? <X size={20} aria-hidden="true" /> : <MessageCircle size={20} aria-hidden="true" />}
        {!open && <span>Ask My Portfolio</span>}
      </button>

      {open && (
        <div id="portfolio-assistant-panel" className="assistant-panel" ref={panelRef} role="dialog" aria-label="Portfolio assistant chat">
          <div className="assistant-header">
            <span>Ask My Portfolio</span>
            <div className="assistant-header-actions">
              <button
                type="button"
                onClick={clearChat}
                className="assistant-clear-btn"
                aria-label="Clear chat"
                title="Clear chat history"
              >
                ↻
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="assistant-close-btn"
                aria-label="Close chat"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="assistant-messages">
            {messages.map((m, i) => (
              <div key={i} className={`assistant-message assistant-message-${m.role} ${m.fallback ? "is-fallback" : ""}`}>
                {m.text}
              </div>
            ))}
            {sending && <div className="assistant-message assistant-message-assistant">Thinking…</div>}
          </div>

          {getRemainingQuestions().length > 0 && (
            <div className="assistant-suggestions">
              {getRemainingQuestions().map((q) => (
                <button key={q} type="button" onClick={() => askQuestion(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            className="assistant-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              askQuestion(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, experience…"
              aria-label="Ask a question about this portfolio"
            />
            <button type="submit" aria-label="Send question" disabled={sending}>
              <Send size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
