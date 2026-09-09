import React from "react";
import Navbar from "../components/Navbar";
import EditorSection from "../components/EditorSection";

const Editor = () => {
  return (
    <>
      <div className="h-screen w-screen overflow-hidden flex flex-col p-1 gap-1">
        <Navbar />
        <EditorSection />
      </div>
    </>
  );
};

export default Editor;
