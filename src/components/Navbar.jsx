import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  RefreshCcw,
  Save,
  ChevronDown,
  Pencil,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import ThemeToggleButton from "./ui/ThemeToggleButton";
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
    <nav className="w-full rounded-lg border-2 px-3 py-1 sm:px-5">
      <div className="flex w-full min-w-0 items-center justify-between gap-2">
        <Link
          className="shrink-0 text-2xl font-extrabold text-accent md:text-3xl"
          to="/"
        >
          <span className="text-text-primary">Web</span>Pad
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 p-1">
          <div className="relative min-w-0" ref={projectMenuRef}>
            <button
              type="button"
              onClick={() => setIsProjectMenuOpen((prev) => !prev)}
              className="flex max-w-full items-center gap-2 rounded-md bg-border px-3 py-1 text-sm text-text-primary transition-colors hover:bg-panel md:px-5 md:py-2"
              aria-expanded={isProjectMenuOpen}
              aria-haspopup="menu"
            >
              <span className="max-w-24 truncate sm:max-w-32 md:max-w-40">
                {activeProject?.name}
              </span>

              <ChevronDown
                size={16}
                className={`shrink-0 transition-transform ${
                  isProjectMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProjectMenuOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-panel bg-border p-2 shadow-xl">
                <div className="space-y-1">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
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
                      <span className="block truncate">{project.name}</span>
                    </button>
                  ))}
                </div>

                <div className="my-2 border-t border-panel" />

                <button
                  type="button"
                  onClick={() => {
                    setIsProjectMenuOpen(false);
                    handleRenameProject();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-panel"
                >
                  <Pencil size={15} />
                  <span>Rename Project</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsProjectMenuOpen(false);
                    handleDeleteRequest();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-panel"
                >
                  <Trash2 size={15} />
                  <span>Delete Project</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleCreateProject}
            className="shrink-0 cursor-pointer rounded-md bg-accent p-1 transition-all duration-300 hover:bg-accent-hover active:scale-90"
          >
            <Plus className="size-5 md:size-6" />
          </button>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 md:gap-3">
          <ThemeToggleButton />
          <button
            type="button"
            onClick={handleReset}
            className="cosmic-button flex items-center gap-1 border-2 border-accent bg-transparent text-accent transition-all duration-300 hover:bg-transparent"
          >
            <RefreshCcw size={15} />
            <span className="hidden md:block">Reset</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="cosmic-button flex items-center gap-1 border-2 border-green-600 bg-green-600 text-white transition-all duration-300 hover:bg-green-400"
          >
            <Save size={15} />
            <span className="hidden md:block">Save</span>
          </button>

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-bold md:h-8 md:w-8 md:font-extrabold">
            A
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;