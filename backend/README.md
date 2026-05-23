# AI Debugging Assistant Backend

Backend API service for the AI Debugging Assistant project.

## Responsibilities

The backend is responsible for:

- Handling API requests
- Validating request payloads
- Calling OpenAI APIs
- Generating structured debugging analysis
- Returning validated JSON responses

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- OpenAI API
- Zod
- dotenv
- CORS

---

# Folder Structure

```txt
src/
│
├── controllers/
├── routes/
├── schemas/
├── services/
├── types/
├── app.ts
└── server.ts
```

---

# Installation

```bash
npm install
```

---

# Run Development Server

```bash
npm run dev
```

Runs on:

```txt
http://localhost:5225
```

---

# Build Project

```bash
npm run build
```

---

# Start Production Build

```bash
npm start
```

---

# Environment Variables

Create:

```txt
.env
```

Add:

```env
PORT=5225
OPENAI_API_KEY=your_api_key
```

---

# API Endpoints

## Health Check

```http
GET /health
```

---

## Analyze Debugging Issue

```http
POST /api/debug/analyze
```

### Request Body

```json
{
  "errorMessage": "TypeError: Cannot read properties of undefined reading map",
  "stackTrace": "at UserList.jsx:12",
  "codeSnippet": "const names = users.map(user => user.name);",
  "language": "JavaScript",
  "framework": "React"
}
```

---

## Mock Analyze Endpoint

```http
POST /api/debug/mock-analyze
```

Returns mock debugging analysis data.

---

# Validation

The project uses Zod for:

- Request payload validation
- AI response validation

---

# Future Improvements

- Database persistence
- Authentication
- Rate limiting
- Logging system
- AI streaming responses
- Vector search / RAG
- GitHub repository integration

---

# License

MIT
