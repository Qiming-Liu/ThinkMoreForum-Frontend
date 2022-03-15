import React from 'react';
import { Snackbar } from '@mui/material';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';

const StySnackbar = styled(Snackbar)`
  root: {
    top: 40px;
  }
`;

const Notification = (props) => {
  const { notify, setNotify } = props;
  // const classes = useStyles();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <StySnackbar
      // className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </StySnackbar>
  );
};

export default Notification;
