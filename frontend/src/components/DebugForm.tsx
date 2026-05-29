import { useState } from "react";
import {
  analyzeDebugIssue,
  mockAnalyzeDebugIssue,
} from "../api/debugApi";
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

  const loadReactExample = () => {
    setErrorMessage(
      "TypeError: Cannot read properties of undefined reading map"
    );

    setStackTrace("at UserList.jsx:12");

    setCodeSnippet(
      `const names = users.map(user => user.name);`
    );

    setLanguage("JavaScript");
    setFramework("React");
  };

  const loadNodeExample = () => {
    setErrorMessage(
      "UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'id' of null"
    );

    setStackTrace(
      `at getUser (/server/controllers/userController.js:24:18)`
    );

    setCodeSnippet(
      `const userId = user.id;

const user = await User.findById(req.params.id);`
    );

    setLanguage("JavaScript");
    setFramework("Node.js");
  };

  const loadMongoExample = () => {
    setErrorMessage(
      "MongoNetworkError: failed to connect to server"
    );

    setStackTrace(
      `MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017`
    );

    setCodeSnippet(
      `mongoose.connect(process.env.MONGO_URI);`
    );

    setLanguage("JavaScript");
    setFramework("MongoDB");
  };

  const loadTypeScriptExample = () => {
    setErrorMessage(
      "Type 'string | undefined' is not assignable to type 'string'"
    );

    setStackTrace(
      `src/services/auth.service.ts:18:5`
    );

    setCodeSnippet(
      `const token: string = process.env.JWT_SECRET;`
    );

    setLanguage("TypeScript");
    setFramework("Node.js");
  };

  return (
    <div className="card">
      <h2>Analyze Debugging Issue</h2>

      <div className="example-section">
        <p className="example-title">
          Quick Examples
        </p>

        <div className="example-grid">
          <button
            type="button"
            className="example-button"
            onClick={loadReactExample}
          >
            React Undefined Map
          </button>

          <button
            type="button"
            className="example-button"
            onClick={loadNodeExample}
          >
            Node.js Async Error
          </button>

          <button
            type="button"
            className="example-button"
            onClick={loadMongoExample}
          >
            MongoDB Connection
          </button>

          <button
            type="button"
            className="example-button"
            onClick={loadTypeScriptExample}
          >
            TypeScript Type Error
          </button>
        </div>
      </div>

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
        <button
          onClick={handleAnalyze}
          disabled={loading || !errorMessage}
        >
          {loading
            ? "Analyzing debugging issue..."
            : "Analyze Issue"}
        </button>

        <button
          type="button"
          onClick={handleMockAnalyze}
        >
          Use Mock Result
        </button>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>

          <p>
            Analyzing stack trace and identifying root
            cause...
          </p>
        </div>
      )}
    </div>
  );
};

export default DebugForm;