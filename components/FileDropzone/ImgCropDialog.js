import React, { useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved, import/extensions
import ImageCropper from './ImgCropper';

const ImgCropDialog = ({ open, DialogClose, img, afterCrop, aspectRatio }) => {
  const ImgCropRef = useRef();
  return (
    <Dialog
      open={open}
      onClose={DialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Crop your picture</DialogTitle>
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
