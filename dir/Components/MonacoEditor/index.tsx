import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const MonacoEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className='for-viewport w-full max-w-[800px] justify-center'>

        <div className="flex flex-col w-full h-full border rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-gray-100">
            <Select onValueChange={setLanguage} value={language}>
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
        <div className="flex w-full rounded-lg overflow-hidden">
          <Editor
            height="400px"
            width="100%"
            defaultLanguage={language}
            value={code}
            onChange={(value: string | undefined)=> setCode(value || "")}
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
        </div>
       
        </div>

    </div>
  );
};

export default MonacoEditor;
