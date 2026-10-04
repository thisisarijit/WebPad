import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import React, { useEffect, useRef } from "react";
import { EditorState, Compartment } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@fsegurai/codemirror-theme-github-dark";
import { githubLight } from "@fsegurai/codemirror-theme-github-light";
import { useThemeContext } from "../context/ThemeContext";


//get the language extension
const getLanguageExtension = (language) => {
  switch (language) {
    case "html":
      return html();
    case "css":
      return css();
    case "javascript":
      return javascript();
    default:
      return [];
  }
};

//removing vertical line between line numbers and code
const removeGutterSeparation = EditorView.theme({
  ".cm-gutters": {
    backgroundColor: "inherit !important",
    borderRight: "none !important",
  },
});

const CodeEditor = ({ activeFile, onChange }) => {
  const { isDarkMode } = useThemeContext();

  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const isUpdatingFromReact = useRef(false);

  const languageCompartment = useRef(new Compartment());
  const themeCompartment = useRef(new Compartment());

  //always keep the latest onChange
  onChangeRef.current = onChange;
  useEffect(() => {
    if (!editorRef.current || !activeFile) return;

    const startState = EditorState.create({
      doc: activeFile.content,
      extensions: [
        basicSetup,

        //initial language
        languageCompartment.current.of(
          getLanguageExtension(activeFile.language),
        ),

        themeCompartment.current.of(isDarkMode ? githubDark : githubLight),
        removeGutterSeparation,

        //listen for user changes
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !isUpdatingFromReact.current) {
            const newContent = update.state.doc.toString();
            onChangeRef.current(newContent);
            // console.log(activeFile.content);
          }
        }),
      ],
    });
    const view = new EditorView({
      //   doc: "Start document",
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  // useEffect for file switching
  useEffect(() => {
    if (!viewRef.current || !activeFile) return;

    const view = viewRef.current;

    isUpdatingFromReact.current = true;

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: activeFile.content,
      },

      effects: languageCompartment.current.reconfigure(
        getLanguageExtension(activeFile.language),
      ),
    });

    isUpdatingFromReact.current = false;
  }, [activeFile.id]);

  // useEffect for Theme Switching
  useEffect(() => {
    if (!viewRef.current) return;

    viewRef.current.dispatch({
      effects: themeCompartment.current.reconfigure(
        isDarkMode ? githubDark : githubLight,
      ),
    });
  }, [isDarkMode]);

  return (
    <div
      ref={editorRef}
      className="code-editor h-full w-full overflow-hidden"
    />
  );
};

export default CodeEditor;
