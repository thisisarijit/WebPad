import { Terminal, TerminalSquare, X } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ConsolePanel = ({ logs, onClear, toggleConsole }) => {
  const consoleEndRef = useRef(null);

  //scroll to the last console message
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({
      behavior: "auto",
    });
  }, [logs]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-border flex items-center justify-between px-4 text-text-primary py-2">
        <button
          className="px-2 rounded-sm flex items-center gap-1 cursor-pointer bg-accent-hover/50 text-text-primary"
          onClick={toggleConsole}
        >
          <Terminal size={20} />
          Console
        </button>
        <button
          className="cursor-pointer hover:text-accent"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-auto p-3">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-text-secondary">
            <TerminalSquare  size={50} />
            <p>No console output</p>
          </div>
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
