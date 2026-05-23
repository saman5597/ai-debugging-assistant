import { useState } from "react";
import DebugForm from "./components/DebugForm";
import AnalysisResult from "./components/AnalysisResult";
import { DebugAnalysisResponse } from "./types/debug";
import "./App.css";

function App() {
  const [result, setResult] = useState<DebugAnalysisResponse | null>(null);

  return (
    <main className="app">
      <header>
      <h1>
        AI <span>Debugging Assistant</span>
      </h1>
        <p>
          Paste your error, stack trace, and code snippet to get root cause
          analysis and fix suggestions.
        </p>
      </header>

      <div className="layout">
        <DebugForm onResult={setResult} />
        {result && <AnalysisResult result={result} />}
      </div>
    </main>
  );
}

export default App;