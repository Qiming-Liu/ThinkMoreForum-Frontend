import React from 'react';
import '@uiw/react-textarea-code-editor/dist.css';
import dynamic from 'next/dynamic';

const TextareaCodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false },
);

const CodeEditor = ({ code, setCode }) => {
  return (
    <div data-color-mode="dark">
      <TextareaCodeEditor
        value={code}
        language="html"
        placeholder="Make Sure you Type in HTML formatted code for custom footer."
        onChange={(e) => setCode(e.target.value)}
        padding={15}
        style={{
          fontSize: 14,
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
        minHeight={300}
      />
    </div>
  );
};

export default CodeEditor;
