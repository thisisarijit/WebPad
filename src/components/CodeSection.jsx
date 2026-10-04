import React from "react";
import FileTabs from "./FileTabs";
import CodeEditor from "./CodeEditor";
import { useProjectContext } from "../context/ProjectContext";
const CodeSection = () => {
  const {
    files,
    setFiles,
    activeFileId,
  } = useProjectContext();
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
    <div className="flex h-full min-h-0 w-full flex-col">
      {/* file tabs */}
      <div className="shrink-0 border-b-2 rounded-t-md">
        <FileTabs />
      </div>

      {/* code */}
      <div className="min-h-0 min-w-0 flex-1 text-left">
        <CodeEditor onChange={handleCodeChange} activeFile={activeFile} />
      </div>
    </div>
  );
};

export default CodeSection;
