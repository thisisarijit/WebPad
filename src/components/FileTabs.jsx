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
    setOpenFileIds((prev) => prev.filter((id) => id !== closeId));
    if (closeId === activeFileId) {
      setActiveFileId(openFileIds[0]);
    }
  };
  return (
    <div className="flex gap-1">
      {files.map((file) => {
        if (!openFileIds.includes(file.id)) {
          return null;
        }
        return (
          <div
            key={file.id}
            className={`border rounded-lg flex items-center hover:border-text-primary ${
              file.id === activeFileId
                ? "text-accent border-accent border-2"
                : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveFileId(file.id)}
              className="py-1 px-2 cursor-pointer"
            >
              {file.name}
            </button>

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
