import { useEffect, useState } from "react";
import { fetchDebugHistory } from "../api/historyApi";
import { HistoryItem } from "../types/history";

type Props = {
    onSelect: (id: string) => void;
  };

const HistorySidebar = ({ onSelect }: Props) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] =
  useState("");

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

  const filteredHistory = history.filter(
    (item) =>
      item.errorMessage
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      item.language
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      item.severity
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      (item.framework || "")
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

  return (
    <aside className="history-sidebar">
      <div className="history-header">
        <h2>Recent Debug Sessions</h2>
  
        <input
          className="history-search"
          type="text"
          placeholder="Search history..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>
  
      <div className="history-list">
        {filteredHistory.length === 0 ? (
          <p className="history-empty">
            No matching debug sessions found.
          </p>
        ) : (
          filteredHistory.map((item) => (
            <div
              className="history-card"
              key={item.id}
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
      </div>
    </aside>
  );
};

export default HistorySidebar;