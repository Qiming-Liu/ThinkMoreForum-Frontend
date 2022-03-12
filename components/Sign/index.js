import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
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
    <>
      <Button variant="outlined" onClick={() => dispatch(openSignDialog())}>
        Login
      </Button>
      <SignDialog isOpen={isOpen} onClose={() => dispatch(closeSignDialog())}>
        {content === 'login' ? (
          <Login register={() => dispatch(registerSignDialog())} />
        ) : (
          <Register login={() => dispatch(loginSignDialog())} />
        )}
      </SignDialog>
    </>
  );
};

export default Sign;
