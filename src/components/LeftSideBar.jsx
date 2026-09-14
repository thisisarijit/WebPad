import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

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
      <div className="flex items-center justify-around border-b-2 p-1">
        <span className="font-medium w-full">Files</span>
        <button type="button" onClick={onToggle} aria-label="Toggle sidebar">
          <PanelLeftClose size={25} />
        </button>
      </div>
      <div className="flex flex-col">
        {files.map((file) => (
          <button
            type="button"
            key={file.id}
            onClick={() => handleFileClick(file.id)}
            className={`my-1 py-1 border-x border-b-2 hover:border-text-primary rounded-lg ${file.id === activeFileId && "border-accent"}`}
          >
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
