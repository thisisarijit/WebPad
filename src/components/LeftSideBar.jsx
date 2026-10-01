import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import htmlLogo from "../../public/html_logo.png";
import cssLogo from "../../public/css_logo.png";
import jsLogo from "../../public/js_logo.png";

const LeftSideBar = ({
  onToggle,
  files,
  setFiles,
  activeFileId,
  setActiveFileId,
  openFileIds,
  setOpenFileIds,
}) => {
  const handleFileClick = (fileId) => {
    setActiveFileId(fileId);

    setOpenFileIds((prev) => {
      if (prev.includes(fileId)) {
        return prev;
      }
      return [...prev, fileId];
    });
  };

  return (
    <aside className="rounded-lg border-2 p-2 flex flex-col gap-1">
      <div className="flex items-center justify-between border-b-2 pb-1">
        <span className="font-medium">Project Files</span>
        <PanelLeftClose
          size={35}
          onClick={onToggle}
          className="p-1 text-text-secondary cursor-pointer rounded-sm hover:bg-accent-hover/30 hover:text-text-primary"
        />
      </div>
      <div className="flex flex-col">
        {files.map((file) => (
          <button
            type="button"
            key={file.id}
            onClick={() => handleFileClick(file.id)}
            className={`flex items-center gap-1 my-1 py-1 px-2 border-x border-b-2 hover:border-text-primary rounded-lg overflow-hidden ${file.id === activeFileId ? "bg-border" : ""}`}
          >
            {file.language === "html" ? (
              <img src={htmlLogo} className="h-4 w-4" />
            ) : (
              ""
            )}
            {file.language === "css" ? (
              <img src={cssLogo} className="h-4 w-4" />
            ) : (
              ""
            )}
            {file.language === "javascript" ? (
              <img src={jsLogo} className="h-4 w-4" />
            ) : (
              ""
            )}
            {file.name.toLowerCase()}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default LeftSideBar;
