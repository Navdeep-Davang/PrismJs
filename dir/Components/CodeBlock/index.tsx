"use client";

import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

const sampleCode = `function helloWorld() {
  console.log("Hello, World!");
}`;

const CodeBlock = () => {
  const [code, setCode] = useState(sampleCode);

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    setCode(event.currentTarget.innerText);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2 text-sm font-bold">
        <span>JavaScript</span>
      </div>

      {/* Code Container (Line numbers + Highlighted Code) */}
      <div className="flex flex-row p-4 overflow-auto">
        {/* Line Number Gutter */}
        <div className="pr-4 w-10 text-gray-500 text-right select-none">
          {code.split("\n").map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Prism Code Block */}
        <Highlight theme={themes.nightOwl} code={code} language="javascript">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} flex-1`} style={style}>
              <div
                className="outline-none whitespace-pre-wrap break-words"
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                spellCheck={false}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </div>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeBlock;
