
import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ language, code, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: code,
      language: language,
      theme: 'vs-dark',
      automaticLayout: true,
    });

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    return () => editor.dispose();
  }, [language, code]);

  return <div ref={editorRef} style={{ height: '100%', width: '100%' }} />;
};

export default CodeEditor;
