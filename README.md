# AI Root Cause Analyzer

Root Cause Analyzer is an AI-powered developer tool built with **React, Node.js, TypeScript, OpenAI, PostgreSQL, and Prisma** that helps engineers investigate runtime errors through structured AI-generated root cause analysis and persistent debugging history.

The application helps developers analyze runtime errors, stack traces, and code snippets by generating structured root cause analysis, suggested fixes, improved code recommendations, and preventive guidance.

Unlike a simple stateless AI demo, the application persists every debugging session and allows developers to revisit previous analyses through a searchable debugging history.

---

## Live Demo

**Application:**

https://root-cause-analyzer.vercel.app/

---

## Features

### AI-Powered Debug Analysis

- Analyze runtime errors
- Understand stack traces
- Review code snippets
- Generate root cause analysis
- Suggest possible fixes
- Recommend improved code
- Provide prevention tips
- Assign severity levels
- Return confidence scores

---

### Persistent Debug History

- Save every AI analysis
- PostgreSQL-backed storage
- Search previous sessions
- Reload historical reports
- Clickable debugging history
- Automatic history refresh

---

### User Experience

- Modern responsive interface
- Built-in debugging examples
- Loading states
- Scrollable history panel
- Searchable history sidebar
- Interactive report retrieval

---

## Screenshots

### Home

![Home](./screenshots/home.png)

---

### AI Analysis

![Analysis](./screenshots/analysis.png)

---

### Persistent Debug History

![History](./screenshots/history.png)

---

## Architecture

```text
                   +------------------+
                   |      React       |
                   +---------+--------+
                             |
                             |
                   +---------v--------+
                   |   Express API    |
                   +---------+--------+
                             |
              +--------------+--------------+
              |                             |
              |                             |
    +---------v---------+       +-----------v-----------+
    |      OpenAI       |       |  PostgreSQL (Neon)   |
    +-------------------+       +-----------+-----------+
                                            |
                                  +---------v---------+
                                  |    Prisma ORM     |
                                  +-------------------+
```

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios

### Backend

- Node.js
- Express.js
- TypeScript

### AI

- OpenAI API

### Database

- PostgreSQL (Neon)
- Prisma ORM

### Validation

- Zod

### Deployment

- Railway (Backend)
- Vercel (Frontend)

---

## Project Structure

```text
ai-root-cause-analyzer/
│
├── backend/
│   ├── prisma/
│   └── src/
│
├── frontend/
│   └── src/
│
├── screenshots/
│
└── README.md
```

---

## API Endpoints

### Analyze Debugging Issue

```http
POST /api/debug/analyze
```

---

### Mock Analysis

```http
POST /api/debug/mock-analyze
```

---

### Fetch Debug History

```http
GET /api/debug/history
```

---

### Fetch Single Debug Report

```http
GET /api/debug/report/:id
```

---

## Example Request

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

## Local Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on:

```text
http://localhost:5225
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```text
http://localhost:5173
```

---

## Current Capabilities

- AI-assisted debugging
- Persistent debugging history
- Report retrieval
- Searchable history
- PostgreSQL storage
- Root cause analysis
- Severity classification
- Confidence scoring
- Suggested fixes
- Improved code recommendations

---

## Future Roadmap

### Version 1.1

- Debug report sharing
- Export analysis
- Better filtering
- Pagination

### Version 2.0

- GitHub PR analysis
- Repository-aware debugging
- Log correlation
- Context-aware debugging workflows

### Long-term Vision

- AST/codebase analysis
- AI-assisted root cause tracing
- Production observability integration
- Developer workflow automation

---

## Motivation

Modern AI models can explain isolated errors, but effective debugging often requires preserving context and revisiting previous investigations.

This project explores how AI can assist developer workflows by combining structured AI analysis with persistent debugging history and an intuitive retrieval experience.

---

## Author

**Saman Arshad**

7+ years of experience building full-stack applications across JavaScript ecosystems, currently exploring AI-assisted developer tooling.

---

## License

MIT
