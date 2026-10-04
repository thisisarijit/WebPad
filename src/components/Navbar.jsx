import React, { useRef, useState, useEffect } from "react";
import {
  Plus,
  RefreshCcw,
  Save,
  ChevronDown,
  Pencil,
  Trash2,
} from "lucide-react";
import ThemeToggleButton from "./ui/ThemeToggleButton";
import { Link } from "react-router-dom";
import { useProjectContext } from "../context/ProjectContext";

const Navbar = ({ handleReset, handleDeleteRequest }) => {
  const {
    projects,
    activeProjectId,
    setActiveProjectId,
    handleCreateProject,
    handleRenameProject,
    handleSave,
  } = useProjectContext();

  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const projectMenuRef = useRef(null);

  const activeProject = projects.find(
    (project) => project.id === activeProjectId,
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        projectMenuRef.current &&
        !projectMenuRef.current.contains(event.target)
      ) {
        setIsProjectMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full py-1 border-2 rounded-lg ">
      <div className="container w-full rounded-lg flex items-center justify-between gap-5">
        <Link className="font-extrabold text-2xl text-accent" to="/">
          WebPad
        </Link>

        <div className="w-full gap-2 flex p-1 items-center">
          <div className="relative" ref={projectMenuRef}>
            <button
              type="button"
              onClick={() => setIsProjectMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-md bg-border px-5 py-2 text-sm text-text-primary hover:bg-panel"
            >
              <span>{activeProject?.name}</span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isProjectMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProjectMenuOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-panel bg-border p-2 shadow-xl">
                {/* projects */}
                <div className="space-y-1">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        setActiveProjectId(project.id);
                        setIsProjectMenuOpen(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                        project.id === activeProjectId
                          ? "bg-panel text-text-primary"
                          : "text-text-secondary hover:bg-panel hover:text-text-primary"
                      }`}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>

                <div className="my-2 border-t border-panel" />

                {/* rename */}
                <button
                  onClick={() => {
                    setIsProjectMenuOpen(false);
                    handleRenameProject();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-panel"
                >
                  <Pencil size={15} />
                  Rename Project
                </button>

                {/* delete */}
                <button
                  onClick={() => {
                    setIsProjectMenuOpen(false);
                    handleDeleteRequest();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-panel "
                >
                  <Trash2 size={15} />
                  Delete Project
                </button>
              </div>
            )}
          </div>
          <Plus
          size={33}
            onClick={handleCreateProject}
            className="cursor-pointer px-2 bg-accent rounded-md hover:bg-accent-hover transition-all duration-300 active:scale-90"
          />
        </div>

        <div className="flex items-center justify-around gap-5">
          <div className="rounded-full">
            <ThemeToggleButton />
          </div>
          <button
            onClick={handleReset}
            className="cosmic-button bg-transparent hover:bg-transparent border-accent border-2 text-accent flex items-center gap-1"
          >
            <RefreshCcw size={15} />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="cosmic-button bg-green-600 hover:bg-green-400 flex items-center gap-1"
          >
            {" "}
            <Save size={15} />
            Save
          </button>
          <div className="rounded-full h-8 w-8 bg-accent flex items-center justify-center font-extrabold">
            A
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
