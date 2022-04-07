import React, { useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ImageCropper from './ImgCropper.tsx';

const ImgCropDialog = ({ open, DialogClose, img, afterCrop, aspectRatio }) => {
  const ImgCropRef = useRef();
  return (
    <Dialog open={open} onClose={DialogClose}>
      <DialogTitle>Crop your picture</DialogTitle>
      <DialogContent>
        <ImageCropper aspectRatio={aspectRatio} src={img} onRef={ImgCropRef} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            DialogClose();
            afterCrop(ImgCropRef.current.getCropData());
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImgCropDialog;
