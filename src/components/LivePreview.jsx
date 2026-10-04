import React, { useEffect, useState } from "react";
import ConsolePanel from "./ConsolePanel";
import { Terminal } from "lucide-react";
import { useProjectContext } from "../context/ProjectContext";

const LivePreview = () => {
  const {files} = useProjectContext();
  const [previewCode, setPreviewCode] = useState("");
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  const toggleConsole = () => {
    setIsConsoleOpen((prev) => !prev);
  };

  //   console.log(htmlCode);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogs([]);
      const htmlCode = files.find((file) => file.language === "html");
      const cssCode = files.find((file) => file.language === "css");
      const jsCode = files.find((file) => file.language === "javascript");

      const combineCode = `
      <!DOCTYPE html>
        <html>
            <head>
                <style>
                ${cssCode?.content ?? ""}
                </style>
            </head>
            <body>
                ${htmlCode?.content ?? ""}
                <script>
                  window.addEventListener("error", (event) => {
                    window.parent.postMessage(
                      {
                        type: "console",
                        level: "error",
                        args: [event.message],
                      },
                      "*"
                    );
                  });
                  const originalLog = console.log;
                  const originalWarn = console.warn;
                  const originalError = console.error;

                  console.log = (...args) => {
                    window.parent.postMessage(
                      {
                        type: "console",
                        level: "log",
                        args: args.map(String),
                      },
                      "*"
                    );

                    originalLog(...args);
                  };

                  console.warn = (...args) =>{
                    window.parent.postMessage(
                      {
                        type: "console",
                        level: "warn",
                        args: args.map(String),
                      },
                      "*"
                    );
                    originalWarn(...args)  ;
                  };

                  console.error = (...args) => {
                      window.parent.postMessage(
                        {
                          type: "console",
                          level: "error",
                          args: args.map(String),
                        },
                        "*"
                      );

                      originalError(...args);
                    };                  
                </script>
                <script>
                ${jsCode?.content ?? ""}
                </script>
            </body>
        </html>`;

      setPreviewCode(combineCode);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [files]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type !== "console") return;

      setLogs((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          level: event.data.level,
          message: event.data.args.join(" "),
        },
      ]);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleClear = () => {
    setLogs([]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 bg-white">
        <iframe
          title="Live Preview"
          srcDoc={previewCode}
          sandbox="allow-scripts allow-modals"
          className="h-full w-full"
        />
      </div>

      {isConsoleOpen ? (
        <div className="h-40">
          <ConsolePanel
            logs={logs}
            onClear={handleClear}
            toggleConsole={toggleConsole}
          />
        </div>
      ) : (
        <div className="flex items-center px-4 py-2 bg-panel/20">
          <button
            onClick={toggleConsole}
            className="flex items-center gap-1 cursor-pointer px-2 text-text-secondary hover:bg-accent-hover/30 hover:text-text-primary rounded-sm"
          >
            <Terminal size={20} />
            Console
          </button>
        </div>
      )}
    </div>
  );
};

export default LivePreview;
