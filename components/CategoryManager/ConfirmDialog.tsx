import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

const ConfirmDialog = ({
  confirmDialog,
  setConfirmDialog,
}: {
  confirmDialog: any;
  setConfirmDialog: any;
}) => {
  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle />
      <DialogContent>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
        <Button onClick={confirmDialog.onConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
