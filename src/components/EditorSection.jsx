import { useState } from "react";
import { PanelLeftOpen } from "lucide-react";
import LeftSideBar from "./LeftSideBar";
import CodeAndOutput from "./CodeAndOutput";

const EditorSection = ({
  files,
  setFiles,
  activeFileId,
  setActiveFileId,
  openFileIds,
  setOpenFileIds,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`grid h-full min-h-0 w-full gap-1 overflow-hidden ${
        isSidebarOpen ? "grid-cols-[1fr_5fr]" : "grid-cols-[48px_minmax(0,1fr)]"
      }`}
    >
      {isSidebarOpen ? (
        <LeftSideBar
          onToggle={toggleSidebar}
          files={files}
          setFiles={setFiles}
          activeFileId={activeFileId}
          setActiveFileId={setActiveFileId}
          openFileIds={openFileIds}
          setOpenFileIds={setOpenFileIds}
        />
      ) : (
        // <button
        //   type="button"
        //   onClick={toggleSidebar}
        //   className="flex items-start justify-center rounded-lg border-2 pt-3"
        //   aria-label="Open sidebar"
        // >
        <div  className="flex items-start justify-center rounded-lg border-2 pt-2">
          <PanelLeftOpen size={35} onClick={toggleSidebar} className="p-1 text-text-secondary cursor-pointer rounded-sm hover:bg-accent-hover/30 hover:text-text-primary" />
        </div>
        // </button>
      )}
      <CodeAndOutput
        files={files}
        setFiles={setFiles}
        activeFileId={activeFileId}
        setActiveFileId={setActiveFileId}
        openFileIds={openFileIds}
        setOpenFileIds={setOpenFileIds}
      />
    </div>
  );
};

export default EditorSection;
