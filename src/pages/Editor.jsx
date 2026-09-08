import React from "react";
import Navbar from "../components/Navbar";
import EditorSection from "../components/EditorSection";

const Editor = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Navbar />
        <EditorSection />
      </div>
    </>
  );
};

export default Editor;
