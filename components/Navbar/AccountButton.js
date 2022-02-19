import React, { useRef } from 'react';
import { Avatar, Box, ButtonBase } from '@mui/material';
import UserCircleIcon from '../../icons/user-circle';
// import { AccountPopover } from './account-popover';

const AccountButton = () => {
  const anchorRef = useRef(null);
  // const [openPopover, setOpenPopover] = useState(false);
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    avatar: '/avatar.png',
    name: 'Alan',
  };

  // const handleOpenPopover = () => {
  //   setOpenPopover(true);
  // };

  // const handleClosePopover = () => {
  //   setOpenPopover(false);
  // };

  return (
    <>
      <Box
        component={ButtonBase}
        // onClick={handleOpenPopover}
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
          src={user.avatar}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      {/* <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      /> */}
    </>
  );
};

export default AccountButton;
