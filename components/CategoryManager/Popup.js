import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

const Popup = (props) => {
  const { children, openPopup, setOpenPopup } = props;
  return (
    <Dialog
      maxWidth="md"
      open={openPopup}
      onClose={() => {
        setOpenPopup(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
