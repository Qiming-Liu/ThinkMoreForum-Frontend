import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import React from 'react';
import { Box } from '@mui/material';

const QuillEditor = ({ onChange, placeholder, value, ...other }) => {
  const { quillRef } = useQuill();

  return (
    <Box ref={quillRef} style={{ height: '300px' }} {...other}>
      <Box onChange={onChange} placeholder={placeholder} value={value} />
    </Box>
  );
};

export default QuillEditor;
