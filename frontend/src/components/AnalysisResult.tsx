import { DebugAnalysisResponse } from "../types/debug";

type Props = {
  result: DebugAnalysisResponse;
};

const AnalysisResult = ({ result }: Props) => {
  return (
    <div className="card">
      <h2>Analysis Result</h2>

      <section>
        <h3>Summary</h3>
        <p>{result.summary}</p>
      </section>

      <section>
        <h3>Root Cause</h3>
        <p>{result.rootCause}</p>
      </section>

      <section>
        <h3>Severity</h3>
        <span className={`badge ${result.severity}`}>
          {result.severity}
        </span>
      </section>

      <section>
        <h3>Confidence Score</h3>
        <p>{Math.round(result.confidenceScore * 100)}%</p>
      </section>

      <section>
        <h3>Suggested Fix</h3>
        <p>{result.suggestedFix}</p>
      </section>

      {result.improvedCode && (
        <section>
          <h3>Improved Code</h3>
          <pre>
            <code>{result.improvedCode}</code>
          </pre>
        </section>
      )}

      <section>
        <h3>Prevention Tips</h3>
        <ul>
          {result.preventionTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </section>

      {result.followUpQuestions && result.followUpQuestions.length > 0 && (
        <section>
          <h3>Follow-up Questions</h3>
          <ul>
            {result.followUpQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AnalysisResult;