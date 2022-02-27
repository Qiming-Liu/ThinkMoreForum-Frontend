import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const Quill = dynamic(() => import('react-quill'), { ssr: false });

const quillStyle = {
  height: '300px',
  marginBottom: '20px',
};

const QuillEditor = ({ onChange, placeholder, value, ...other }) => {
  const ref = useRef(null);

  return (
    <Quill
      ref={ref}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      style={quillStyle}
      {...other}
    />
  );
};

export default QuillEditor;
