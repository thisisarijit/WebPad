import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EditorSection from "../components/EditorSection";
import ResetModal from "../components/ui/ResetModal";
import { useProjectContext } from "../context/ProjectContext";

const Editor = () => {
  const { projects, activeProject, handleDeleteProject, handleReset } =
    useProjectContext();

  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleResetRequest = () => {
    setShowResetModal(true);
  };

  const handleDeleteRequest = () => {
    if (projects.length <= 1) {
      alert("You can not delete the last project.");
      return;
    }
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="h-screen min-h-0 w-screen overflow-hidden flex flex-col p-1 gap-1">
        <Navbar
          handleReset={handleResetRequest}
          handleDeleteRequest={handleDeleteRequest}
        />
        <div className="min-h-0 flex-1">
          <EditorSection />
        </div>
        {/* R E S E T  PROJECT*/}
        <ResetModal
          isOpen={showResetModal}
          title="Reset Project?"
          message="This will reset the project to its initial state. Your current changes will be lost."
          onCancel={() => setShowResetModal(false)}
          onConfirm={() => {
            handleReset();
            setShowResetModal(false);
          }}
          confirmText="Reset"
        />
        {/* D E L E T E  PROJECT */}
        <ResetModal
          isOpen={showDeleteModal}
          title="Delete Project?"
          message={`Are you sure you want to delete "${activeProject?.name}"? This action cannot be undone.`}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDeleteProject();
            setShowDeleteModal(false);
          }}
          confirmText="Delete"
        />
      </div>
    </>
  );
};

export default Editor;
