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
    const rect = container.getBoundingClientRect();
    const newWidth = ((event.clientX - rect.left) / rect.width) * 100;

    const safeWidth = Math.min(70, Math.max(30, newWidth));
    setCodeWidth(safeWidth);
  };

  const handlePointerUp = (event) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const handlePointerCancel = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      ref={containerRef}
      className="flex flex-col sm:grid h-full min-h-0 min-w-0 rounded-lg overflow-hidden"
      style={{
        gridTemplateColumns: `${codeWidth}% 6px minmax(0, 1fr)`,
      }}
    >
      {/* CODE */}
      <div className="h-full min-h-0 min-w-0 overflow-hidden border-2 rounded-lg">
        {" "}
        <CodeSection />
      </div>

      {/* DIVIDER */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="group relative cursor-col-resize touch-none flex items-center justify-center"
      >
        <div className="hidden sm:block sm:h-full sm:w-1 bg-accent/50 group-hover:bg-text-primary rounded-lg" />
      </div>

      {/* OUTPUT */}
      <div className="h-full min-h-0 min-w-0 overflow-hidden border-2 rounded-lg">
        <LivePreview />
      </div>
    </section>
  );
};

export default CodeAndOutput;
