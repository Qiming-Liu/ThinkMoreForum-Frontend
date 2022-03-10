import { useDropzone } from 'react-dropzone';
import React from 'react';
import { Box, Button } from '@mui/material';

const ChangePicButton = (props) => {
  const { accept, maxFiles, maxSize, minSize, onDrop, ...other } = props;
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
  });
  return (
    <div {...other}>
      <Box {...getRootProps()}>
        <input {...getInputProps()} />
        <Button>Change</Button>
      </Box>
    </div>
  );
};

export default ChangePicButton;
