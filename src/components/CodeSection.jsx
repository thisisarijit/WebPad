import React from "react";
import FileTabs from "./FileTabs";

const CodeSection = ({
  files,
  activeFileId,
  setActiveFileId,
  openFileIds,
  setOpenFileIds,
}) => {
  const activeTab = files.find((file) => file.id === activeFileId);
    if(!activeTab)  {
        return (
            <div></div>
        );
    }
  
  return (
    <div className="p-1">
      {/* file tabs */}
      <div className="p-1 border-b-2">
        <FileTabs
          files={files}
          activeFileId={activeFileId}
          setActiveFileId={setActiveFileId}
          openFileIds={openFileIds}
          setOpenFileIds={setOpenFileIds}
        />
      </div>

      {/* code */}
    <div>{activeTab.content}</div>
    </div>
  );
};

export default CodeSection;
