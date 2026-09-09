import React, { useRef, useState } from "react";

const CodeAndOutput = () => {
  const containerRef = useRef(null);

  const [codeWidth, setCodeWidth] = useState(50);

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event) => {
    if(!event.currentTarget.hasPointerCapture(event.pointerId)) {
        return;
    }

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newWidth = ((event.clientX - rect.left) / rect.width) * 100;

    const safeWidth = Math.min(80, Math.max(20, newWidth));
    setCodeWidth(safeWidth);
  };

  const handlePointerUp = (event) => {
    event.currentTarget.releasePointerCapture(event.pointerId)
  };
  const handlePointerCancel = (event) => {
    if(event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTargetreleasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      ref={containerRef}
      className="grid h-full min-w-0 gap-1 rounded-lg"
      style={{
        gridTemplateColumns: `${codeWidth}% 6px minmax(0, 1fr)`,
      }}
    >
      {/* CODE */}
      <div className="h-full border-2 rounded-lg">Code</div>

      {/* DIVIDER */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="group relative cursor-col-resize touch-none"
      >
        <div className="h-full w-1 bg-panel group-hover:bg-text-primary rounded-lg" />
      </div>

      {/* OUTPUT */}
      <div className="h-full border-2 rounded-lg">Output</div>
    </section>
  );
};

export default CodeAndOutput;
