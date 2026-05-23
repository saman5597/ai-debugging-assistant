import { useState } from "react";
import { analyzeDebugIssue, mockAnalyzeDebugIssue } from "../api/debugApi";
import { DebugAnalysisResponse } from "../types/debug";

type Props = {
  onResult: (result: DebugAnalysisResponse) => void;
};

const DebugForm = ({ onResult }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [stackTrace, setStackTrace] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [framework, setFramework] = useState("React");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const result = await analyzeDebugIssue({
        errorMessage,
        stackTrace,
        codeSnippet,
        language,
        framework,
      });

      onResult(result);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze issue. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleMockAnalyze = async () => {
    try {
      const result = await mockAnalyzeDebugIssue();
      onResult(result);
    } catch (error) {
      console.error(error);
      alert("Mock API failed. Check if backend is running.");
    }
  };

  return (
    <div className="card">
      <h2>Analyze Debugging Issue</h2>

      <label>Error Message *</label>
      <textarea
        value={errorMessage}
        onChange={(e) => setErrorMessage(e.target.value)}
        placeholder="Paste error message here"
      />

      <label>Stack Trace</label>
      <textarea
        value={stackTrace}
        onChange={(e) => setStackTrace(e.target.value)}
        placeholder="Paste stack trace here"
      />

      <label>Code Snippet</label>
      <textarea
        value={codeSnippet}
        onChange={(e) => setCodeSnippet(e.target.value)}
        placeholder="Paste related code here"
      />

      <label>Language</label>
      <input
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />

      <label>Framework</label>
      <input
        value={framework}
        onChange={(e) => setFramework(e.target.value)}
      />

      <div className="button-row">
        <button onClick={handleAnalyze} disabled={loading || !errorMessage}>
          {loading ? "Analyzing debugging issue..." : "Analyze Issue"}
        </button>

        <button type="button" onClick={handleMockAnalyze}>
          Use Mock Result
        </button>
      </div>
    </div>
  );
};

export default DebugForm;