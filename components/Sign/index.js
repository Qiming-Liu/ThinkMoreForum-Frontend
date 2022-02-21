import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as Action from '../../store/actions/signAction';
import SignDialog from './SignDialog';
import Login from './Login';
import Register from './Register';

const Sign = () => {
  const dialogOpen = useSelector((state) => state.sign.isOpen);
  const dialogContent = useSelector((state) => state.sign.content);
  const dispatch = useDispatch();

  return (
    <SignDialog
      open={dialogOpen}
      onOpen={() => dispatch(Action.setSignDialogOpen())}
      onClose={() => dispatch(Action.setSignDialogClose())}
    >
      {dialogContent === 'login' ? (
        <Login register={() => dispatch(Action.setSignDialogRegister())} />
      ) : (
        <Register login={() => dispatch(Action.setSignDialogLogin())} />
      )}
    </SignDialog>
  );
};

export default Sign;
