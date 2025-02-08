import type { Klass, LexicalNode } from 'lexical';

import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { CodeNode } from './CodeNode';
import { CodeHighlightNode } from './CodeHighlightNode';

export const Nodes: Array<Klass<LexicalNode>> = [
  CodeNode,
  CodeHighlightNode,
  HorizontalRuleNode,
];
