import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EditorSection from "../components/EditorSection";
import ResetModal from "../components/ui/ResetModal";

const initialFiles = [
  {
    id: crypto.randomUUID(),
    name: "index.html",
    language: "html",
    content: `<body>
<section>
  <h1>COUNTER</h1>
  <div id="count">
    <button onclick="decrease()">−</button>
    <div id="count-val">0</div>
    <button onclick="increase()">+</button>
  </div>
  </section>
</body>
    `,
  },
  {
    id: crypto.randomUUID(),
    name: "style.css",
    language: "css",
    content: `section{
background: LightGrey;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 15px;
padding: 20px;
margin: 20px;
}
#count {
  font-size: 40px;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}
button {
  background: LightGreen;
  font-size: 30px;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
    `,
  },

  {
    id: crypto.randomUUID(),
    name: "script.js",
    language: "javascript",
    content: `let count = 0;
function increase() {
  count++;
  document.getElementById("count-val").textContent = count;
}
function decrease() {
  count--;
  document.getElementById("count-val").textContent = count;
}
    `,
  },
];
const STORAGE_KEY = "web-editor-project";

const Editor = () => {
  const loadSavedProject = () => {
    const project = localStorage.getItem(STORAGE_KEY);

    if (!project) return null;

    try {
      return JSON.parse(project);
    } catch (error) {
      console.error("Failed to load saved project: ", error);
      return null;
    }
  };

  const savedProject = loadSavedProject();

  const [files, setFiles] = useState(savedProject?.files ?? initialFiles);
  const [activeFileId, setActiveFileId] = useState(
    savedProject?.activeFileId ?? initialFiles[0].id,
  );
  const [openFileIds, setOpenFileIds] = useState(
    savedProject?.openFileIds ?? [initialFiles[0].id],
  );
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSave = () => {
    const project = {
      files,
      activeFileId,
      openFileIds,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  };

  const handleResetRequest = () => {
    setShowResetModal(true);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);

    setFiles(initialFiles);
    setActiveFileId(initialFiles[0].id);
    setOpenFileIds([initialFiles[0].id]);

    setShowResetModal(false);
  };

  return (
    <>
      <div className="h-screen min-h-0 w-screen overflow-hidden flex flex-col p-1 gap-1">
        <Navbar handleSave={handleSave} handleReset={handleResetRequest} />
        <div className="min-h-0 flex-1">
          <EditorSection
            files={files}
            setFiles={setFiles}
            activeFileId={activeFileId}
            setActiveFileId={setActiveFileId}
            openFileIds={openFileIds}
            setOpenFileIds={setOpenFileIds}
          />
        </div>
        <ResetModal
          isOpen={showResetModal}
          title="Reset Project?"
          message="This will reset the project to its initial state. Your current changes will be lost."
          onCancel={() => setShowResetModal(false)}
          onConfirm={handleReset}
        />
      </div>
    </>
  );
};

export default Editor;
