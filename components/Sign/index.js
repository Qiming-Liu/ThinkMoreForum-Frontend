import React from 'react';
import SignDialog from './SignDialog';
import Login from './Login';
import Register from './Register';

const Sign = ({
  isOpen,
  content,
  isLoading,
  openSignDialog,
  closeSignDialog,
  registerSignDialog,
  loginSignDialog,
  loginAction,
}) => {
  return (
    <SignDialog
      isOpen={isOpen}
      onOpen={() => openSignDialog()}
      onClose={() => closeSignDialog()}
    >
      {content === 'login' ? (
        <Login
          register={() => registerSignDialog()}
          isLoading={isLoading}
          loginAction={loginAction}
        />
      ) : (
        <Register login={() => loginSignDialog()} />
      )}
    </SignDialog>
  );
};

export default Sign;
