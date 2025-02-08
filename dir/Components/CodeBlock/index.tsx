"use client";

import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor } from "lexical";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import Prism from "prismjs";
import TreeViewPlugin from "../../plugins/TreeViewPlugin";
import ForceCodeBlockPlugin from "../../plugins/CodeHighlightPlugin";

const highlightCode = () => {
  document.querySelectorAll("pre code").forEach((block) => {
    Prism.highlightElement(block as HTMLElement);
  });
};

const handleEditorChange = (editorState: EditorState, editor: LexicalEditor) => {
  if(editor) {
    editorState.read(() => {
      highlightCode(); // Trigger PrismJS highlight
    });
  }
  
};

const CodeEditor = () => {
  const editorConfig = {
    namespace: "CodeEditor",
    theme: {
      paragraph: "text-white",
      code: "bg-gray-800 text-green-300 px-2 py-1 rounded",
    },
    nodes: [CodeHighlightNode, CodeNode],
    onError: (error: Error) => {
      console.error(error);
    },
  };


  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="bg-gray-900 code-editor-container text-white rounded-lg shadow-lg border border-gray-700 p-4">
        {/* Header */}
        <div className="bg-gray-800 px-4 py-2 text-sm font-bold">JavaScript</div>

        {/* Editor */}
        <div className="p-4 relative overflow-auto bg-white/10 code-editor-container">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="outline-none bg-transparent w-full min-h-[100px] p-2 text-sm code-editor-container" />
            }
            placeholder={<div className="text-gray-500 select-none pointer-events-none text-sm absolute top-6 left-6">Write code here...</div>}
            ErrorBoundary={() => <div>Error!</div>}
          />
          <OnChangePlugin onChange={handleEditorChange} />
          <ForceCodeBlockPlugin />
        </div>

        <TreeViewPlugin/>
      </div>
    </LexicalComposer>
  );
};

export default CodeEditor;
