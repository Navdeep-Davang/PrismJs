'use client';

import { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const TextEditor: React.FC = () => {
  const [typingState, setTypingState] = useState(''); // Stores what user types
  const [highlightedState, setHighlightedState] = useState(''); // Stores highlighted output
  const editorRef = useRef<HTMLDivElement>(null);
  const lastSnapshotRef = useRef(''); // Stores last "snapshot" for comparison

  // Handle typing inside contentEditable
  const handleInput = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText; // Get plain text content
      setTypingState(text);
    }
  };

  useEffect(() => {
    // Debounce effect: Run highlighting only after user stops typing for 500ms
    const timeout = setTimeout(() => {
      if (typingState && typingState !== lastSnapshotRef.current) {
        const highlighted = Prism.highlight(
          typingState,
          Prism.languages.javascript,
          'javascript'
        );
        setHighlightedState(highlighted);
        lastSnapshotRef.current = typingState; // Update snapshot
      }
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timeout);
  }, [typingState]);

  useEffect(() => {
    if (editorRef.current) {
      const originalNodes = editorRef.current.childNodes; // Current typed content
      const tempDiv = document.createElement('div'); // Temporary div to parse HTML
      tempDiv.innerHTML = highlightedState; // Set highlighted HTML
      const newNodes = tempDiv.childNodes; // Get highlighted nodes

      // Apply only updated styles without replacing content
      newNodes.forEach((newNode, index) => {
        const originalNode = originalNodes[index] as HTMLElement;
        if (originalNode && newNode.nodeType === Node.ELEMENT_NODE) {
          originalNode.className = (newNode as HTMLElement).className; // Apply syntax styles
        }
      });
    }
  }, [highlightedState]);

  return (
    <div className='flex justify-center'>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="w-[600px] min-h-[200px] border p-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default TextEditor;
