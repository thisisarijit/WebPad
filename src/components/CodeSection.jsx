import React from "react";
import FileTabs from "./FileTabs";
import CodeEditor from "./CodeEditor";
const CodeSection = ({
  files,
  setFiles,
  activeFileId,
  setActiveFileId,
  openFileIds,
  setOpenFileIds,
}) => {
  const activeFile = files.find((file) => file.id === activeFileId);
  //console.log(activeFile);
  if (!activeFile) return <div></div>;
  
  const handleCodeChange = (newContent) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === activeFileId ? { ...file, content: newContent } : file,
      ),
    );
  };
  return (
    <div className="p-1 h-full">
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
      <div className="h-full">
        <CodeEditor onChange={handleCodeChange} activeFile={activeFile} />
      </div>
    </div>
  );
};

export default CodeSection;
