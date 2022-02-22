import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Action from '../../store/actionTypes';
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
      onOpen={() => dispatch({ type: Action.OPEN_SIGN_DIALOG })}
      onClose={() => dispatch({ type: Action.CLOSE_SIGN_DIALOG })}
    >
      {dialogContent === 'login' ? (
        <Login
          register={() => dispatch({ type: Action.REGISTER_SIGN_DIALOG })}
        />
      ) : (
        <Register login={() => dispatch({ type: Action.LOGIN_SIGN_DIALOG })} />
      )}
    </SignDialog>
  );
};

export default Sign;
