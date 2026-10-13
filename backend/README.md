# Portfolio Assistant Backend

This backend proxies requests to the Groq API, solving CORS issues that prevent direct browser-to-API communication.

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
The `.env` file already has your Groq API key. It should look like:
```
PORT=3001
GROQ_API_KEY=your_groq_key_here
```

### 3. Run the Backend

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The backend will start on `http://localhost:3001`

## How It Works

1. **Frontend** sends a request to `http://localhost:3001/chat` with messages and system prompt
2. **Backend** forwards to Groq API with your API key
3. **Backend** returns the AI response back to frontend
4. **CORS** is handled automatically

## Endpoints

### POST /chat
Send a chat message and get a response.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "What projects has Shashidhar built?" }
  ],
  "systemPrompt": "You are a helpful assistant for R. Shashidhar's portfolio..."
}
```

**Response:**
```json
{
  "answer": "R. Shashidhar has built several projects including..."
}
```

### GET /health
Check if the backend is running.

**Response:**
```json
{
  "status": "ok"
}
```

## Troubleshooting

- **Port 3001 already in use?** Change `PORT` in `.env`
- **GROQ_API_KEY error?** Verify your key is correctly set in `.env`
- **CORS errors in frontend?** Make sure backend is running on `http://localhost:3001`
