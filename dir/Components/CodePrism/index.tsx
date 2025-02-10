import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import Prism's CSS
import 'prismjs/components/prism-javascript'; // Import specific language component

const CodePrism: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const editableRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    console.log('Entered text:', element.innerText);
    setCode(element.innerText);
  };

  useEffect(() => {
    if (editableRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();

      if (selection && selection.rangeCount > 0) {
        const cursorPos = selection.getRangeAt(0).startOffset || 0;
        const newCursorPos = Math.min(cursorPos, editableRef.current.textContent?.length || 0);

        editableRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
        const childNode = editableRef.current.childNodes[0];

        if (childNode && childNode.nodeType === Node.TEXT_NODE) {
          range.setStart(childNode, newCursorPos);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        editableRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
      }
    }
  }, [code]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const selection = window.getSelection();
      const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const cursorPosition = range?.startOffset ?? 0;

      const beforeCursor = code.slice(0, cursorPosition);
      const afterCursor = code.slice(cursorPosition);
      const updatedCode = `${beforeCursor}\t${afterCursor}`;

      setCode(updatedCode);
      setTimeout(() => {
        if (range && editableRef.current) {
          range.setStart(editableRef.current.childNodes[0], cursorPosition + 1);
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 0);
    }
  };

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    handleChange(event);
    const selection = window.getSelection();
    const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const nativeEvent = event.nativeEvent as InputEvent;

    if (nativeEvent.inputType === 'insertLineBreak' && range){
      event.preventDefault();
      const cursorPosition = range.startOffset;
      const beforeCursor = code.slice(0, cursorPosition);
      const afterCursor = code.slice(cursorPosition);
      const updatedCode = `${beforeCursor}\n${afterCursor}`;

      setCode(updatedCode);
      setTimeout(() => {
        if (editableRef.current) {
          range.setStart(editableRef.current.childNodes[0], cursorPosition + 1);
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 0);
    }
  };

  return (
    <div className='for-viewport flex justify-center'>
      <div className='w-[600px]'>
        <div
          ref={editableRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          style={{ whiteSpace: 'pre', fontFamily: 'monospace', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minWidth: '100%' }}
          suppressContentEditableWarning={true}
          className='overflow-x-auto'
        >
        </div>
      </div>
    </div>
  );
};

export default CodePrism;

