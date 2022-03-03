import { useDropzone } from 'react-dropzone';
import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

const ImageDropZone = (props) => {
  const { accept, maxFiles, maxSize, minSize, onDrop, ...other } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
  });
  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          border: 1,
          borderRadius: 1,
          borderStyle: 'dashed',
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          p: 6,
          ...(isDragActive && {
            backgroundColor: 'action.active',
            opacity: 0.5,
          }),
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box>
          <Image
            alt="Select image"
            src="/undraw_add_file2_gvbb.svg"
            width={100}
            height={80}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">
            {`Select image${maxFiles && maxFiles === 1 ? '' : 's'}`}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              {`Drop image${maxFiles && maxFiles === 1 ? '' : 's'}`} browse
              thorough your machine
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ImageDropZone;
