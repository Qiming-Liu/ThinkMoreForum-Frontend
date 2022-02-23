import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignDialog from './SignDialog';
import Login from './Login';
import Register from './Register';
import {
  openSignDialog,
  closeSignDialog,
  registerSignDialog,
  loginSignDialog,
} from '../../store/actions/signAction';

const Sign = () => {
  const { isOpen, content } = useSelector((state) => state.sign);
  const dispatch = useDispatch();
  return (
    <SignDialog
      isOpen={isOpen}
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
