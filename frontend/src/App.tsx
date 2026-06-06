import { useState } from "react";
import DebugForm from "./components/DebugForm";
import AnalysisResult from "./components/AnalysisResult";
import HistorySidebar from "./components/HistorySidebar";

import { DebugAnalysisResponse } from "./types/debug";

import { fetchDebugReport } from "./api/reportApi";

import "./App.css";

function App() {
  const [result, setResult] = useState<DebugAnalysisResponse | null>(null);

  const handleHistorySelect = async (
    id: string
  ) => {
    try {
      const report = await fetchDebugReport(id);
  
      setResult(report);
    } catch (error) {
      console.error(error);
  
      alert("Failed to load report.");
    }
  };

  return (
    <main className="app">
      <header>
        <h1>
          AI <span>Debugging Assistant</span>
        </h1>

        <p>
          Paste your error message, stack trace, and code snippet to get
          AI-powered root cause analysis and fix recommendations.
        </p>
      </header>

      <div className="main-layout">
      <HistorySidebar
        onSelect={handleHistorySelect}
      />

        <div className="layout">
          <DebugForm onResult={setResult} />

          {result ? (
            <AnalysisResult result={result} />
          ) : (
            <div className="card empty-result">
              <h2>Analysis Result</h2>

              <p>
                Submit a debugging issue or select a
                previous session to view AI analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;