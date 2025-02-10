import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState } from "react";
import CodeBlockPlugin from "@/dir/plugins/CodeBlockPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalContentEditable from "../../ContentEditable";
import TreeViewPlugin from "@/dir/plugins/TreeViewPlugin";

export default function Editor(): React.JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  return (
    <div className="w-full">
      <CodeBlockPlugin activeEditor={activeEditor} setActiveEditor={setActiveEditor} />
      <RichTextPlugin
        contentEditable={
          <div className="editor-scroller">
            <div className="editor">
              <LexicalContentEditable placeholder={"Type Here"} />
            </div>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <TreeViewPlugin/>
    </div>
  );
}
