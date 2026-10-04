import { createContext, useContext } from "react";
import useProjects from "../hooks/useProjects";

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const projectState = useProjects();

  return (
    <ProjectContext.Provider value={projectState}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjectContext must be used inside ProjectProvider"
    );
  }
  
  return context;
}; 