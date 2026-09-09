// import React, { useRef, useState, useEffect } from "react";

// const CodeAndOutput = () => {
//   const containerRef = useRef(null);

//   const [isDragging, setIsDragging] = useState(false);
//   const [codeWidth, setCodeWidth] = useState(50);

//   const handlePointerDown = () => {
//     setIsDragging(true);
//   };

//   useEffect(() => {
//     if (!isDragging) return;

//     const handlePointerMove = (event) => {
//       const container = containerRef.current;
//       const rect = container.getBoundingClientRect();
//       const newWidth = ((event.clientX - rect.left) / rect.width) * 100;
//       setCodeWidth(newWidth);
//     };

//     const handlePointerUp = () => {
//       setIsDragging(false);
//     };

//     window.addEventListener("pointermove", handlePointerMove);
//     window.addEventListener("pointerup", handlePointerUp);
//     return () => {
//       window.removeEventListener("pointermove", handlePointerMove);
//       window.removeEventListener("pointerup", handlePointerUp);
//     };
//   }, [isDragging]);

//   return (
//     <section
//       ref={containerRef}
//       className="min-w-0 rounded-lg grid h-full gap-2"
//       style={{ gridTemplateColumns: `${codeWidth}% 6px minmax(0, 1fr)` }}
//     >
//       {/* CODE */}
//       <div className="h-screen bg-red-600 ">Code</div>

//       {/* D I V I D E R  */}
//       <div
//         onPointerDown={handlePointerDown}
//         className="group relative cursor-col-resize"
//       >
//         <div className="h-full w-1 bg-border group-hover:bg-primary" />
//       </div>

//       {/* O U T P U T  */}
//       <div className="h-screen bg-green-500">Output</div>
//     </section>
//   );
// };

// export default CodeAndOutput;

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
