import React, { useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { VerticalAdjustable } from "./VerticalAdjustable";
import * as monacoEditor from 'monaco-editor';

const codeSnippets: Record<string, string> = {
  javascript: `function greet(name) {
      return \`Hello, \${name}!\`;
  }

  console.log(greet("Bob"));`,

  typescript: `import { useRef, useState } from "react";
  import Editor, { Monaco } from "@monaco-editor/react";

  const MyEditor = () => {
    const editorRef = useRef<any>(null);
    const [contentHeight, setContentHeight] = useState(0);

    const handleEditorMount = (editor: any, monaco: Monaco) => {
      editorRef.current = editor;

      // Initial content height
      setContentHeight(editor.getContentHeight());

      // Listen for content changes & update height
      editor.onDidContentSizeChange(() => {
        setContentHeight(editor.getContentHeight());
      });
    };

    return (
      <div>
        <div className="mb-2 text-gray-500">Content Height: {contentHeight}px</div>
        <Editor
          height="100%"
          width="100%"
          language="javascript"
          defaultValue="// Type something..."
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            wordWrap: "off",
            scrollbar: { verticalScrollbarSize: 8 },
          }}
        />
      </div>
    );
  };

  export default MyEditor;
  `,

  python: `def greet(name: str) -> str:
      return f"Hello, {name}!"

  print(greet("Charlie"))`,

  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Greeting</title>
  </head>
  <body>
      <button onclick="alert('Hello, World!')">Click Me</button>
  </body>
  </html>`,

  css: `button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
      background-color: #0056b3;
  }`,
};




const MonacoEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(codeSnippets["javascript"]);
  const [contentHeight, setContentHeight] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleEditorMount = (editor: monacoEditor.editor.IStandaloneCodeEditor , monaco: Monaco) => {
    // Initial content height
    const model = editor.getModel();
    if (model) {
      setContentHeight(model.getLineCount() * editor.getOption(monaco.editor.EditorOption.lineHeight));
    }
    // Listen for content changes & update height
    editor.onDidChangeModelContent(() => {
      const model = editor.getModel();
      if (model) {
        setContentHeight(model.getLineCount() * editor.getOption(monaco.editor.EditorOption.lineHeight));
      }
    });
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(codeSnippets[newLang] || ""); // Update editor with the corresponding snippet
  };

  return (
    <div className='for-viewport w-full max-w-[800px] justify-center'>

        <div className="flex flex-col w-full h-full border rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-gray-100">
            <Select onValueChange={(value) => handleLanguageChange(value)} value={language}>
            <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
            </SelectContent>
            </Select>
            <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
            <Copy size={16} /> Copy
            </Button>
        </div>

        {/* Editor */}
        <VerticalAdjustable contentHeight= {contentHeight}>
          <Editor
            height="100%"
            width="100%"
            language={language}
            value={code}
            onChange={(value: string | undefined)=> setCode(value || "")}
            onMount={handleEditorMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false }, // Disable minimap
              overviewRulerLanes: 0, // Hide decorationsOverviewRuler
              scrollBeyondLastLine: false, // Prevent extra space below content
              scrollBeyondLastColumn: 0, // Prevents scrolling beyond the last character
              tabSize: 2,
              scrollbar: {                
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,                
              },
              wordWrap: "off",
            }}
          />
        </VerticalAdjustable>


        
       
        </div>

    </div>
  );
};

export default MonacoEditor;
