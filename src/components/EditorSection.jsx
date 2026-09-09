// import React, { useState, useEffect } from "react";
// import LeftSideBar from "./LeftSideBar";
// import { PanelLeft } from "lucide-react";

// const EditorSection = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   return (
//     <div
//       className={`h-screen w-screen grid ${isSidebarOpen ? "grid-cols-[1fr_5fr]" : "grid-cols-[1fr_9fr]"} gap-1 p-1`}
//     >
//       {isSidebarOpen ? <LeftSideBar /> : <PanelLeft />}
//       <div className="border-2 rounded-lg">CodeAndOutput</div>
//     </div>
//   );
// };

// export default EditorSection;

import { useEffect, useState } from "react";
import { PanelLeftOpen } from "lucide-react";
import LeftSideBar from "./LeftSideBar";
import CodeAndOutput from "./CodeAndOutput";

const EditorSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`grid h-screen w-screen gap-1 p-1 ${
        isSidebarOpen ? "grid-cols-[1fr_5fr]" : "grid-cols-[48px_minmax(0,1fr)]"
      }`}
    >
      {isSidebarOpen ? (
        <LeftSideBar onToggle={toggleSidebar} />
      ) : (
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex items-start justify-center rounded-lg border-2 pt-3"
          aria-label="Open sidebar"
        >
          <PanelLeftOpen size={25} />
        </button>
      )}
      <CodeAndOutput />
    </div>
  );
};

export default EditorSection;
