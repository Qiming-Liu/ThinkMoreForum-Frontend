import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  openSignDialog,
  closeSignDialog,
  loginSignDialog,
  registerSignDialog,
} from '../../store/actions/signAction';
import SignDialog from './SignDialog';
import Login from './Login';
import Register from './Register';

const Sign = () => {
  const { isOpen, content } = useSelector((state) => state.sign);
  const dispatch = useDispatch();

  return (
    <SignDialog
      open={isOpen}
      onOpen={() => dispatch(openSignDialog())}
      onClose={() => dispatch(closeSignDialog())}
    >
      {content === 'login' ? (
        <Login register={() => dispatch(registerSignDialog())} />
      ) : (
        <Register login={() => dispatch(loginSignDialog())} />
      )}
    </SignDialog>
  );
};

export default Sign;
