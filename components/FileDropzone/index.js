import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';
import ImgCropDialog from './ImgCropDialog';
import hotToast from '../../utils/hotToast';

const FileDropzone = ({ children, accept, afterCrop, aspectRatio }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const onDrop = useCallback(([file]) => {
    const reader = new FileReader();
    reader.onabort = () => hotToast('fail', 'file reading was aborted');
    reader.onerror = () => hotToast('fail', 'file reading has failed');
    reader.onload = () => {
      setImage(reader.result);
      setOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles: 1,
    maxSize: 10485760,
    minSize: 0,
    onDrop,
  });

  return (
    <>
      <Box {...getRootProps()}>
        <input {...getInputProps()} />
        {children}
      </Box>
      <ImgCropDialog
        open={open}
        DialogClose={() => {
          setOpen(false);
        }}
        img={image}
        afterCrop={afterCrop}
        aspectRatio={aspectRatio}
      />
    </>
  );
};

export default FileDropzone;
