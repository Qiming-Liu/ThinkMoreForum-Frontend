import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  // makeStyles,
  IconButton,
} from '@mui/material';
import styled from 'styled-components';
import Controls from './controls/Controls';

const StyedDialog = styled(Dialog)`
  padding: 16px;
  position: absolute;
  top: 40px;
`;

const StyDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const StyDialogContent = styled(DialogContent)`
  text-align: center;
`;

const StyDialogActions = styled(DialogActions)`
  justify-content: center;
`;

// const StyIconButton = styled(IconButton)`
//   /* background-color: #5acce5;
//   color: #5accff; */
//   &:hover {
//     /* background-color: #2e0d7c; */
//     cursor: default;
//     & .MuiSvgIcon-root {
//       font-size: 8rem;
//     }
//   }
// `;

const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;
  // const classes = useStyles();

  return (
    <StyedDialog open={confirmDialog.isOpen}>
      <StyDialogTitle>
        <IconButton disableRipple />
      </StyDialogTitle>
      <StyDialogContent>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </StyDialogContent>
      <StyDialogActions>
        <Controls.Button
          text="No"
          color="secondary"
          text-align="center"
          justify-content="center"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color="secondary"
          text-align="center"
          justify-content="center"
          onClick={confirmDialog.onConfirm}
        />
      </StyDialogActions>
    </StyedDialog>
  );
};

export default ConfirmDialog;
