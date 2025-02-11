'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import dynamic from 'next/dynamic';

const TextEditor: React.FC = () => {
  const [content, setContent] = useState(''); // Stores user input
  const [highlightedContent, setHighlightedContent] = useState(''); // Stores highlighted code
  const [isTyping, setIsTyping] = useState(false); // Tracks typing activity
  const editorRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerText);
      setIsTyping(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const applyHighlighting = useCallback((originalNode: Node, highlightedNode: Node | undefined) => {
    if (!highlightedNode || originalNode.nodeType === Node.TEXT_NODE) return;

    const originalElement = originalNode as HTMLElement;
    const highlightedElement = highlightedNode as HTMLElement;

    if (highlightedElement.className) {
      originalElement.className = highlightedElement.className;
    }

    // Ensure both nodes have the same child structure before applying changes
    const originalChildren = originalElement.childNodes;
    const highlightedChildren = highlightedElement.childNodes;

    for (let i = 0; i < Math.min(originalChildren.length, highlightedChildren.length); i++) {
      applyHighlighting(originalChildren[i], highlightedChildren[i]);
    }
  }, []);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData?.getData("text/plain") || "";
    document.execCommand("insertText", false, text);
  };

  useEffect(() => {
    if (!isTyping && content) {
      const highlighted = Prism.highlight(content, Prism.languages.javascript, 'javascript');
      setHighlightedContent(highlighted);
    }
  }, [isTyping, content]);

  useEffect(() => {
    if (!isTyping && editorRef.current) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = highlightedContent;

      tempDiv.childNodes.forEach((highlightedNode, index) => {
        const originalNode = editorRef.current?.childNodes[index];
        if (originalNode && highlightedNode) { // Fix: Ensure highlightedNode exists
          applyHighlighting(originalNode, highlightedNode);
        }
      });
    }
  }, [applyHighlighting, isTyping, highlightedContent]);

  return (
    <div className='flex justify-center'>
      <div
        ref={editorRef}
        contentEditable
        suppressHydrationWarning
        onInput={handleInput}
        onPaste={handlePaste}
        className="w-[600px] min-h-[200px] border p-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// Disable SSR for this component
export default dynamic(() => Promise.resolve(TextEditor), { ssr: false });
