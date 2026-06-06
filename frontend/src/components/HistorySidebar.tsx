import { useEffect, useState } from "react";
import { fetchDebugHistory } from "../api/historyApi";
import { HistoryItem } from "../types/history";

type Props = {
    onSelect: (id: string) => void;
  };

const HistorySidebar = ({ onSelect }: Props) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  
    const handler = () => {
      loadHistory();
    };
  
    window.addEventListener(
      "historyUpdated",
      handler
    );
  
    return () => {
      window.removeEventListener(
        "historyUpdated",
        handler
      );
    };
  }, []);

  const loadHistory = async () => {
    try {
      const data = await fetchDebugHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="history-sidebar">
      <h2>Recent Debug Sessions</h2>

      {history.length === 0 ? (
        <p className="history-empty">
          No debug history yet.
        </p>
      ) : (
        history.map((item) => (
            <div
            className="history-card"
            onClick={() => onSelect(item.id)}
            >
            <div className="history-top">
              <span
                className={`badge ${item.severity}`}
              >
                {item.severity}
              </span>

              <small>
                {new Date(
                item.createdAt
                ).toLocaleString([], {
                dateStyle: "medium",
                timeStyle: "short",
                })}
              </small>
            </div>

            <p className="history-error">
              {item.errorMessage}
            </p>

            <small className="history-tech">
              {item.language}
              {item.framework
                ? ` • ${item.framework}`
                : ""}
            </small>
          </div>
        ))
      )}
    </aside>
  );
};

export default HistorySidebar;