import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = ({ children, onClose, ...other }) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const SignDialog = ({ children, open, onOpen, onClose }) => {
  return (
    <div>
      <Button variant="outlined" onClick={onOpen}>
        Login
      </Button>
      <BootstrapDialog
        fullWidth
        maxWidth="md"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose} />
        <DialogContent>{children}</DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default SignDialog;
