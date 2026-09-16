import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";

const CodeEditor = ({ activeFile, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current || !activeFile) return;

    const startState = EditorState.create({
      doc: activeFile.content,
      extensions: [
        basicSetup,
        html(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newContent = update.state.doc.toString();
            // onChange(newContent);
            console.log(newContent);
          }
        }),
      ],
    });
    const view = new EditorView({
      //   doc: "Start document",
      state: startState,
      parent: editorRef.current,
    });
    return () => {
      view.destroy();
    };
  }, []);

  return <div ref={editorRef} />;
};

export default CodeEditor;
