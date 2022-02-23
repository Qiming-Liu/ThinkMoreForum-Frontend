import React, { useRef, useState } from 'react';
import { Avatar, Box, ButtonBase } from '@mui/material';
import UserCircleIcon from '../../icons/user-circle';
import AccountPopover from './AccountPopover';

const AccountButton = ({ login }) => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={() => setOpenPopover(true)}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={login ? '/avatar-cao-yu.png' : ''}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={() => setOpenPopover(false)}
        open={openPopover}
      />
    </>
  );
};

export default AccountButton;
