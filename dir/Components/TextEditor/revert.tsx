'use client';

import { useRef } from 'react';

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const indent = '\t';
      document.execCommand('insertText', false, indent); // Insert 4 spaces for tab
    } 
    // else if (e.key === 'Enter') {
    //   e.preventDefault();
    //   document.execCommand('insertHTML', false, '<br><br>'); // Insert a new line
    // }
  };

  return (
    <div className='for-viewport flex justify-center'>

      <div
        ref={editorRef}
        contentEditable
        onKeyDown={handleKeyDown}
        className="w-[600px] min-h-[200px] border p-2 outline-none focus:ring-2 focus:ring-blue-500"
      ></div>

    </div>
  );
};

export default TextEditor;
