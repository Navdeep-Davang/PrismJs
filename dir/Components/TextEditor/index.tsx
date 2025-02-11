'use client';

import { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import dynamic from 'next/dynamic';

const TextEditor: React.FC = () => {
  const [content, setContent] = useState(''); // Stores raw user input
  const editorRef = useRef<HTMLDivElement>(null);

  // Function to get the cursor position
  const getCaretPosition = (element: HTMLElement) => {
    let position = 0;
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange.toString().length;
    }
    return position;
  };

  // Function to set the cursor position
  const setCaretPosition = (element: HTMLElement, offset: number) => {
    const selection = window.getSelection();
    const range = document.createRange();
    let currentOffset = 0;

    const findOffset = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textLength = node.textContent?.length || 0;
        if (currentOffset + textLength >= offset) {
          range.setStart(node, offset - currentOffset);
          range.setEnd(node, offset - currentOffset);
          return true;
        }
        currentOffset += textLength;
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          if (findOffset(node.childNodes[i])) return true;
        }
      }
      return false;
    };

    findOffset(element);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  // Handles input event and updates content state
  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerText);
    }
  };

  // Updates contentEditable's inner HTML when content changes
  useEffect(() => {
    if (editorRef.current) {
      const cursorPosition = getCaretPosition(editorRef.current); // Capture cursor position

      const highlightedHTML = Prism.highlight(content, Prism.languages.javascript, 'javascript');
      editorRef.current.innerHTML = highlightedHTML;

      setCaretPosition(editorRef.current, cursorPosition); // Restore cursor position
    }
  }, [content]);

  return (
    <div className='flex justify-center'>
      <div
        ref={editorRef}
        contentEditable
        suppressHydrationWarning
        onInput={handleInput}
        className="w-[600px] min-h-[200px] border p-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// Disable SSR for this component
export default dynamic(() => Promise.resolve(TextEditor), { ssr: false });
