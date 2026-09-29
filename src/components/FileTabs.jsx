import { X } from "lucide-react";
import React from "react";

const FileTabs = ({
  files,
  activeFileId,
  setActiveFileId,
  openFileIds,
  setOpenFileIds,
}) => {
  const handleCloseTab = (closeId) => {
    const index = openFileIds.findIndex((item) => item === closeId);
    const remainingFileIds = openFileIds.filter((id) => id !== closeId);
    setOpenFileIds(remainingFileIds);
    if (closeId === activeFileId) {
    const newActiveId =
      remainingFileIds[index] ??
      remainingFileIds[index - 1] ??
      null;

    setActiveFileId(newActiveId);
  }
  };
  return (
    <div className="flex">
      {files.map((file) => {
        if (!openFileIds.includes(file.id)) {
          return null;
        }
        return (
          <div
            key={file.id}
            className={`rounded-t-sm flex items-center justify-center hover:bg-border/60 ${
              file.id === activeFileId
                ? "text-accent bg-border border-2"
                : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveFileId(file.id)}
              className="px-1 cursor-pointer"
            >
              {file.name}
            </button>

            {/* close button for the specific file */}
            <button
              type="button"
              onClick={() => handleCloseTab(file.id)}
              className="p-1 hover:text-text-primary cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FileTabs;
