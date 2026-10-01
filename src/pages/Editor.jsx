import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EditorSection from "../components/EditorSection";
import ResetModal from "../components/ui/ResetModal";

const INITIAL_FILES = [
  {
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
</body>`,
  },
  {
    name: "style.css",
    language: "css",
    content: `section {
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
}`,
  },
  {
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
}`,
  },
];

const createInitialFiles = () => {
  return INITIAL_FILES.map((file) => ({
    ...file,
    id: crypto.randomUUID(),
  }));
};

const createProject = (name) => {
  const files = createInitialFiles();
  return {
    id: crypto.randomUUID(),
    name,
    files,
    activeFileId: files[0].id,
    openFileIds: [files[0].id],
    // activeFileId: null,
    // openFileIds: [],
  };
};

const STORAGE_KEY = "web-editor-project";

const Editor = () => {
  const loadSavedProjects = () => {
    const projects = localStorage.getItem(STORAGE_KEY);

    if (!projects) return null;

    try {
      return JSON.parse(projects);
    } catch (error) {
      console.error("Failed to load saved projects: ", error);
      return null;
    }
  };

  const savedProjects = loadSavedProjects();
  const initialProject =
    savedProjects?.projects?.[0] ?? createProject("My First Project");

  const [projects, setProjects] = useState(
    savedProjects?.projects ?? [initialProject],
  );

  const [activeProjectId, setActiveProjectId] = useState(
    savedProjects?.activeProjectId ?? initialProject.id,
  );

  const activeProject = projects.find(
    (project) => project.id === activeProjectId,
  );

  const files = activeProject?.files ?? [];
  const setFiles = (updatedFiles) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === activeProjectId
          ? {
              ...project,
              files:
                typeof updatedFiles === "function"
                  ? updatedFiles(project.files)
                  : updatedFiles,
            }
          : project,
      ),
    );
  };

  const activeFileId = activeProject?.activeFileId ?? null;
  const setActiveFileId = (fileId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === activeProjectId
          ? {
              ...project,
              activeFileId: fileId,
            }
          : project,
      ),
    );
  };

  const openFileIds = activeProject?.openFileIds ?? [activeFileId];
  const setOpenFileIds = (updatedIds) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === activeProjectId
          ? {
              ...project,
              openFileIds:
                typeof updatedIds === "function"
                  ? updatedIds(project.openFileIds)
                  : updatedIds,
            }
          : project,
      ),
    );
  };
  const [showResetModal, setShowResetModal] = useState(false);

  const handleCreateProject = () => {
    const projectName = window.prompt("Project name", "");

    if (projectName === null) return;
    const trimmedName = projectName.trim();
    if (!trimmedName) return;

    const alreadyExists = projects.some(
      (project) => project.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (alreadyExists) {
      alert("Project already exists.");
      return;
    }

    const newProject = createProject(trimmedName);
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setActiveProjectId(newProject.id);
  };

  const handleSave = () => {
    const data = {
      projects,
      activeProjectId,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const handleResetRequest = () => {
    setShowResetModal(true);
  };

  const handleReset = () => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.id !== activeProjectId) return project;

        //returning the activeProject after updating the all file's of the activeProject
        return {
          ...project,
          files: project.files.map((file) => {
            const initialFile = INITIAL_FILES.find(
              (initial) => initial.name === file.name,
            );

            //returning after updating a single file's content
            return {
              ...file,
              content: initialFile.content,
            };
          }),
        };
      });

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          projects: updatedProjects,
          activeProjectId,
        }),
      );

      return updatedProjects;
    });

    setShowResetModal(false);
  };

  const handleRenameProject = () => {
    const currentProject = projects.find(
      (project) => project.id === activeProjectId,
    );

    if (!currentProject) return;

    const projectName = window.prompt("Rename Project?", currentProject.name);
    if (projectName === null) return;

    const trimmedName = projectName.trim();
    if (!trimmedName) {
      alert("Project name can not be empty");
      return;
    }

    const alreadyExist = projects.some(
      (project) =>
        project.id !== activeProjectId &&
        project.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (alreadyExist) {
      alert("A project with this name already exists.");
      return;
    }

    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === activeProjectId
          ? {
              ...project,
              name: trimmedName,
            }
          : project,
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          projects: updatedProjects,
          activeProjectId,
        }),
      );

      return updatedProjects;
    });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteRequest = () => {
    if (projects.length <= 1) {
      alert("You can not delete the last project.");
      return;
    }
    setShowDeleteModal(true);
  };

  const handleDeleteProject = () => {
    if (projects.length <= 1) return;

    const deletedIndex = projects.findIndex(
      (project) => project.id === activeProjectId,
    );
    if (deletedIndex === -1) {
      return;
    }
    const updatedProjects = projects.filter(
      (project) => project.id !== activeProjectId,
    );

    const newActiveProject =
      updatedProjects[deletedIndex] ?? updatedProjects[deletedIndex - 1];

    const updatedActiveProjectId = newActiveProject.id;
    setProjects(updatedProjects);
    setActiveProjectId(updatedActiveProjectId);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        projects: updatedProjects,
        activeProjectId: updatedActiveProjectId,
      }),
    );

    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="h-screen min-h-0 w-screen overflow-hidden flex flex-col p-1 gap-1">
        <Navbar
          projects={projects}
          activeProjectId={activeProjectId}
          setActiveProjectId={setActiveProjectId}
          handleCreateProject={handleCreateProject}
          handleRenameProject={handleRenameProject}
          handleDeleteRequest={handleDeleteRequest}
          handleSave={handleSave}
          handleReset={handleResetRequest}
        />
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
        {/* R E S E T  PROJECT*/}
        <ResetModal
          isOpen={showResetModal}
          title="Reset Project?"
          message="This will reset the project to its initial state. Your current changes will be lost."
          onCancel={() => setShowResetModal(false)}
          onConfirm={handleReset}
          confirmText="Reset"
        />
        {/* D E L E T E  PROJECT */}
        <ResetModal
          isOpen={showDeleteModal}
          title="Delete Project?"
          message={`Are you sure you want to delete "${activeProject?.name}"? This action cannot be undone.`}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteProject}
          confirmText="Delete"
        />
      </div>
    </>
  );
};

export default Editor;
