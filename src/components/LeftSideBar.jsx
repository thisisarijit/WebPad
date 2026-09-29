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
  const handleCreateFile = () => {
    let newFileName = window.prompt("Filename", "");
    if (newFileName === "" || newFileName === null) return;
    const trimmedName = newFileName.trim();
    const extension = trimmedName.split(".").pop().toLowerCase();

    //Checking valid extension or not. HTNL / CSS /JS
    if (extension !== "html" && extension !== "css" && extension !== "js") {
      alert("Supported extension: .html, .css, .js");
      return;
    }

    //duplicate file check
    const alreadyExist = files.some(
      (file) => file.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (alreadyExist) {
      alert("File already exists.");
      return;
    }

    //Get the Extension name from the file.
    const getLanguageFromFileName = (newFileName) => {
      switch (extension) {
        case "html":
          return "html";
        case "css":
          return "css";
        case "js":
          return "javascript";
        default:
          return "plaintext";
      }
    };

    //NEW FILE
    const newFile = {
      id: crypto.randomUUID(),
      name: trimmedName,
      language: getLanguageFromFileName(trimmedName),
      content: "",
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
    setOpenFileIds((prev) => [...prev, newFile.id]);
  };

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
      <button
        onClick={handleCreateFile}
        className="bg-panel w-full cosmic-button"
      >
        +
      </button>
    </aside>
  );
};

export default LeftSideBar;
