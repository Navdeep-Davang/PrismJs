//V 0.1.0

import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import Prism's CSS
import 'prismjs/components/prism-javascript'; // Import specific language component

const CodePrism: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const editableRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    console.log('Entered text:', element.innerText);
    setCode(element.innerText);
  };

  useEffect(() => {
    const selection = window.getSelection();
    const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    setCursorPosition(range?.endOffset ?? 0);
  }, [code]);

   useEffect(() => {
      if (editableRef.current) {
        editableRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
      }
    }, [code]);

  useEffect(() => {
    if (editableRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      const childNode = editableRef.current.childNodes[0];
      
      if (childNode && childNode.nodeType === Node.TEXT_NODE) {
        range.setStart(childNode, Math.min(cursorPosition, childNode.textContent?.length || 0));
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, [cursorPosition]);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const element = editableRef.current;
      if (element) {
        const selection = window.getSelection();
        const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        const cursorPosition = range?.startOffset ?? 0;

        const beforeCursor = code.slice(0, cursorPosition);
        const afterCursor = code.slice(cursorPosition);
        const updatedCode = `${beforeCursor}\t${afterCursor}`;

        setCode(updatedCode);
        setTimeout(() => {
          if (range) {
            range.setStart(element.childNodes[0], cursorPosition + 1);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }, 0);
      }
    }
  };

  return (
    <div>
      <div
        ref={editableRef}
        contentEditable
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        suppressContentEditableWarning={true}
      >
      </div>
    </div>
  );
};

export default CodePrism;
