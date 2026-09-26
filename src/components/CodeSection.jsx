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
  if (!activeFile) return <div></div>;

  //set file content if user make changes(write or delete something) in the content
  const handleCodeChange = (newContent) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === activeFileId ? { ...file, content: newContent } : file,
      ),
    );
  };

  // console.log("Files: ");
  // console.log(files);
  return (
    <div className="flex h-full min-h-0 w-full flex-col p-1">
      {/* file tabs */}
      <div className="shrink-0 p-1 border-b-2">
        <FileTabs
          files={files}
          activeFileId={activeFileId}
          setActiveFileId={setActiveFileId}
          openFileIds={openFileIds}
          setOpenFileIds={setOpenFileIds}
        />
      </div>

      {/* code */}
      <div className="min-h-0 min-w-0 flex-1 text-left">
        <CodeEditor onChange={handleCodeChange} activeFile={activeFile} />
      </div>
    </div>
  );
};

export default CodeSection;
