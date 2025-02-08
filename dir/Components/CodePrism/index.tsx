"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Highlight, themes } from "prism-react-renderer";

const CodePrism = () => {
  const [code, setCode] = useState<string>(`console.log("Hello, World!");`);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [cursorCoords, setCursorCoords] = useState({ top: 0, left: 0 });

  // Syncs scrolling between textarea and highlighted code
  const syncScroll = () => {
    if (textareaRef.current && codeRef.current) {
      codeRef.current.scrollTop = textareaRef.current.scrollTop;
      codeRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Focus textarea when clicking on code block
  const focusTextarea = () => {
    textareaRef.current?.focus();
  };


  const updateCursorPosition = useCallback(() => {
    if (!textareaRef.current || !codeRef.current) return;
  
    const { selectionStart } = textareaRef.current;
    setCursorIndex(selectionStart);
  
    // Create a temporary span to measure the cursor position
    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "pre-wrap";
    tempSpan.style.fontSize = "inherit";
    tempSpan.style.fontFamily = "inherit";
    tempSpan.style.padding = "inherit";
    tempSpan.textContent = code.slice(0, selectionStart) || " ";
  
    codeRef.current.appendChild(tempSpan);
  
    const rect = tempSpan.getBoundingClientRect();
    const containerRect = codeRef.current.getBoundingClientRect();
  
    setCursorCoords({
      top: rect.top - containerRect.top,
      left: rect.left - containerRect.left,
    });
  
    codeRef.current.removeChild(tempSpan);
  }, [code, setCursorCoords, setCursorIndex]); // Dependencies
  
  useEffect(() => {
    updateCursorPosition();
  }, [cursorIndex, code, updateCursorPosition]);
  

  return (
    <div className="relative w-full max-w-2xl">
      {/* Hidden Textarea */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          updateCursorPosition();
        }}
        onKeyUp={updateCursorPosition}
        onClick={updateCursorPosition}
        onScroll={syncScroll}
        className="absolute inset-0 w-full h-full opacity-0 z-10"
        spellCheck="false"
      />

      {/* Syntax Highlighted Code */}
      <div
        ref={codeRef}
        className="relative p-4 bg-gray-900 text-white rounded-md overflow-auto"
        style={{ minHeight: "200px", whiteSpace: "pre-wrap" }}
        onClick={focusTextarea}
      >
        <Highlight theme={themes.nightOwl} code={code} language="javascript">
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style} className="relative">
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <div {...lineProps} key={i}>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token, key });
                      return <span {...tokenProps} key={key} />;
                    })}
                  </div>
                );
              })}
              {/* Fake Cursor */}
              <span
                className="absolute w-[2px] h-5 bg-white animate-blink"
                style={{
                  top: cursorCoords.top,
                  left: cursorCoords.left,
                }}
              />
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodePrism;
