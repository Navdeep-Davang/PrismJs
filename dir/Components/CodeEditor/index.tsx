'use client';

import { Nodes } from '@/dir/nodes';
import PrismJsTheme from '@/dir/utils/PrismJsTheme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import Editor from './Editor';

function $prepopulatedEditorText() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const paragraph = $createParagraphNode();
    paragraph.append(
      $createTextNode('Welcome to the Code Editor! Start typing your code here...')
    );
    root.append(paragraph);
  }
}

export default function CodeEditor() {
  const initialConfig = {
    editorState: $prepopulatedEditorText,
    namespace: 'CodeEditor',
    nodes: [...Nodes],
    theme: PrismJsTheme,
    onError: (error: Error) => {
      console.error('CodeEditor Error:', error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container flex justify-center items-center px-20 py-5">
          <Editor />
        </div>
    </LexicalComposer>
  );
}
