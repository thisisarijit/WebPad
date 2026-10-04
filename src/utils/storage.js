const STORAGE_KEY = "web-editor-project";

export const loadProjects = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return null;

  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.error("Failed to load saved projects:", error);
    return null;
  }
};

export const saveProjects = (projects, activeProjectId) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      projects,
      activeProjectId,
    }),
  );
};
