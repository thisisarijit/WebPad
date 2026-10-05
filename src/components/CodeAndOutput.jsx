import React, { useRef, useState } from "react";
import CodeSection from "./CodeSection";
import LivePreview from "./LivePreview";

const CodeAndOutput = () => {
  const containerRef = useRef(null);
  const [codeWidth, setCodeWidth] = useState(50);

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    const container = containerRef.current;

    if (!container) return;

    const rect = container.getBoundingClientRect();

    const newWidth =
      ((event.clientX - rect.left) / rect.width) * 100;

    const safeWidth = Math.min(70, Math.max(30, newWidth));

    setCodeWidth(safeWidth);
  };

  const handlePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerCancel = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      ref={containerRef}
      className="grid h-full min-h-0 min-w-0 w-full overflow-hidden rounded-lg"
      style={{
        gridTemplateColumns: `${codeWidth}% 8px minmax(0, 1fr)`,
      }}
    >
      {/* CODE */}
      <div className="min-h-0 min-w-0 overflow-hidden rounded-lg border-2 border-border">
        <CodeSection />
      </div>

      {/* DIVIDER */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="group relative z-10 flex h-full w-2 cursor-col-resize touch-none items-center justify-center"
      >
        <div className="h-full w-1 rounded-lg bg-panel transition-colors group-hover:bg-text-primary" />
      </div>

      {/* OUTPUT */}
      <div className="min-h-0 min-w-0 overflow-hidden rounded-lg border-2 border-border">
        <LivePreview />
      </div>
    </section>
  );
};

export default CodeAndOutput;