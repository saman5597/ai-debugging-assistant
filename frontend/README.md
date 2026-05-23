# AI Debugging Assistant Frontend

Frontend application for the AI Debugging Assistant project.

## Responsibilities

The frontend is responsible for:

- Collecting debugging inputs
- Calling backend APIs
- Displaying AI analysis results
- Showing severity and confidence indicators
- Rendering improved code suggestions

---

# Tech Stack

- React
- TypeScript
- Vite
- Axios

---

# Features

- Error message input
- Stack trace input
- Code snippet input
- AI debugging analysis display
- Severity badges
- Confidence score display
- Mock analysis support

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
http://localhost:5173
```

---

# Folder Structure

```txt
src/
│
├── api/
├── components/
├── types/
├── App.tsx
└── main.tsx
```

---

# API Integration

Frontend connects to backend APIs:

```txt
http://localhost:5255/api
```

---

# Example Workflow

```txt
User enters debugging issue
        ↓
Frontend sends API request
        ↓
Backend performs AI analysis
        ↓
Frontend renders structured result
```

---

# Future Improvements

- Monaco code editor
- Syntax highlighting
- Dark mode
- Authentication
- Saved debugging history
- Search and filtering
- Responsive mobile UI
- Markdown rendering
- Streaming AI responses

---

# License

MIT
