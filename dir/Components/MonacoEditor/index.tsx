import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { VerticalAdjustable } from "./VerticalAdjustable";
import * as monacoEditor from 'monaco-editor';
import codeSnippetsData from "@/dir/data/codeSnippets.json";

const codeSnippets: Record<string, string> = codeSnippetsData;

const MonacoEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(codeSnippets["javascript"]);
  const [contentHeight, setContentHeight] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleEditorMount = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
    // Initial content height
    const model = editor.getModel();
    if (model) {
      model.updateOptions(
        { tabSize: 2 , 
        insertSpaces: true // Ensures spaces instead of tabs
        }
      ); 
    }

    const updateContentHeight = () => {
      if (!editor) return; // Ensure editor exists

      const newHeight = editor.getContentHeight(); // This considers folded sections
      setContentHeight(newHeight);
      console.log("Updated content height:", newHeight);
    };



    // Listen for content changes & update height
    editor.onDidChangeModelContent(() => {
      updateContentHeight();
    });

    // Listen for folding/unfolding changes & update height
    editor.onDidChangeModelDecorations(() => {
      updateContentHeight();
      console.log("Model decorations changed:");
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
        <div className="flex items-center justify-between p-2 border-b bg-gray-50 ">
            <Select onValueChange={(value) => handleLanguageChange(value)} value={language}>
              <SelectTrigger className="flex items-center justify-between w-28 h-8 text-xs px-2 py-1 border rounded-md shadow-sm  focus:ring-0 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCopy} variant="outline" className="flex items-center gap-1 h-8 text-xs px-2 py-1">
              <Copy size={12} /> Copy
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
            theme= "vs-dark"
            options={{
              minimap: { enabled: false }, // Disable minimap
              overviewRulerLanes: 0, // Hide decorationsOverviewRuler
              scrollBeyondLastLine: false, // Prevent extra space below content
              scrollBeyondLastColumn: 0, // Prevents scrolling beyond the last character
              tabSize: 2,
              fontFamily: "Fira Code, monospace", 
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
