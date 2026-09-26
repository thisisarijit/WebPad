import React, { useRef, useState } from "react";
import CodeSection from "./CodeSection";
import LivePreview from "./LivePreview";

const CodeAndOutput = ({
  files,
  setFiles,
  activeFileId,
  setActiveFileId,
  openFileIds,
  setOpenFileIds,
}) => {
  const containerRef = useRef(null);

  //width of the code section after dividing by the divider
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
      className="grid h-full min-h-0 min-w-0 gap-1 rounded-lg"
      style={{
        gridTemplateColumns: `${codeWidth}% 6px minmax(0, 1fr)`,
      }}
    >
      {/* CODE */}
      <div className="h-full border-2 rounded-lg">
        {" "}
        <CodeSection
          files={files}
          setFiles={setFiles}
          activeFileId={activeFileId}
          setActiveFileId={setActiveFileId}
          openFileIds={openFileIds}
          setOpenFileIds={setOpenFileIds}
        />{" "}
      </div>

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
      <div className="h-full border-2 rounded-lg bg-white">
        <LivePreview files={files} />
      </div>
    </section>
  );
};

export default CodeAndOutput;
