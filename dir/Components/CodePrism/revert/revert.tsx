// V 0.0.0 

import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import Prism's CSS
import 'prismjs/components/prism-javascript'; // Import specific language component

const CodePrism: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const editableRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    setCode(element.innerText);
  };

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
  }, [code]);

  return (
    <div>
      <div
        ref={editableRef}
        contentEditable
        onInput={handleChange}
        style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default CodePrism;
