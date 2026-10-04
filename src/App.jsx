import React from "react";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext";
import { ThemeProvider } from "./context/ThemeContext.jsx";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />

            <Route
              path="editor"
              element={
                <ProjectProvider>
                  <Editor />
                </ProjectProvider>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
