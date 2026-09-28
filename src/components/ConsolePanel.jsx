import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ConsolePanel = ({ logs, onClear, toggleConsole }) => {
  const consoleEndRef = useRef(null);

  //scroll to the last console message
  useEffect(()=> {
    consoleEndRef.current?.scrollIntoView({
      behavior: "auto",
    })
  },[logs]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-8 flex items-center justify-between px-5 border-b text-panel">
        <button
          className="cursor-pointer hover:text-text-primary"
          onClick={toggleConsole}
        >
          Console ↓
        </button>
        <button
          className="cursor-pointer hover:text-text-primary"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-auto p-3">
        {logs.length === 0 ? (
          <p>No console output</p>
        ) : (
          logs.map((log) => (
            <div key={log.id}>
              {log.level === "warn" && "⚠ "}
              {log.level === "error" && "✕ "}
              {log.message}
            </div>
          ))
        )}

        <div ref={consoleEndRef} />
      </div>
    </div>
  );
};

export default ConsolePanel;
