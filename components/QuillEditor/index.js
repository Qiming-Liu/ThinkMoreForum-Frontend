import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import React from 'react';
import { Box } from '@mui/material';

const QuillEditor = ({ onChange, value, placeholder, ...other }) => {
  const { quillRef } = useQuill();

  return (
    <Box
      ref={quillRef}
      style={{ height: '300px' }}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      {...other}
    />
  );
};

export default QuillEditor;
