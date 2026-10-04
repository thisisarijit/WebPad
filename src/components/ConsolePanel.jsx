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
        <span className="px-2 rounded-sm flex items-center gap-1 bg-background text-accent">
          <Terminal size={20} />
          Console
          <X
            size={20}
            onClick={toggleConsole}
            className="p-0.5 cursor-pointer rounded-sm text-text-secondary hover:text-text-primary hover:bg-border/80"
          />
        </span>
        <button className="cursor-pointer hover:text-accent" onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-auto p-3">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-text-secondary">
            <TerminalSquare size={50} />
            <p>No console output</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`font-jetBrains-mono flex justify-center gap-2 ${log.level === "warn" ? `text-yellow-400` :""} ${log.level === "error" ? `text-red-600` :""}`}
            >
              {log.level === "warn" && "⚠ "}
              {log.level === "error" && "✕ "}
              <div className="text-text-primary">{log.message}</div>
            </div>
          ))
        )}

        <div ref={consoleEndRef} />
      </div>
    </div>
  );
};

export default ConsolePanel;
