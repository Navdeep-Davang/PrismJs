/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



import type {EditorThemeClasses} from 'lexical';

const PrismJsTheme: EditorThemeClasses = {
  code: 'EditorTheme__code',
  codeHighlight: {
    atrule: 'EditorTheme__tokenAtrule',
    attr: 'EditorTheme__tokenAttrName',
    boolean: 'EditorTheme__tokenBoolean',
    builtin: 'EditorTheme__tokenBuiltin',
    cdata: 'EditorTheme__tokenCdata',
    char: 'EditorTheme__tokenChar',
    class: 'EditorTheme__tokenClassName',
    'class-name': 'EditorTheme__tokenClassName',
    comment: 'EditorTheme__tokenComment',
    constant: 'EditorTheme__tokenConstant',
    deleted: 'EditorTheme__tokenDeleted',
    doctype: 'EditorTheme__tokenDoctype',
    entity: 'EditorTheme__tokenEntity',
    function: 'EditorTheme__tokenFunction',
    important: 'EditorTheme__tokenImportant',
    inserted: 'EditorTheme__tokenInserted',
    keyword: 'EditorTheme__tokenKeyword',
    namespace: 'EditorTheme__tokenNamespace',
    number: 'EditorTheme__tokenNumber',
    operator: 'EditorTheme__tokenOperator',
    prolog: 'EditorTheme__tokenProlog',
    property: 'EditorTheme__tokenProperty',
    punctuation: 'EditorTheme__tokenPunctuation',
    regex: 'EditorTheme__tokenRegex',
    selector: 'EditorTheme__tokenSelector',
    string: 'EditorTheme__tokenString',
    symbol: 'EditorTheme__tokenSymbol',
    tag: 'EditorTheme__tokenTag',
    url: 'EditorTheme__tokenUrl',
    variable: 'EditorTheme__tokenVariable',
  },
};

export default PrismJsTheme;