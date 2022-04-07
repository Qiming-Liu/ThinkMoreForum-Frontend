import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box, ButtonBase } from '@mui/material';
import AccountPopover from './AccountPopover';

const AccountButton = ({ isLogin }) => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const { myDetail } = useSelector((state) => state.sign);

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={() => setOpenPopover(isLogin)}
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
          src={myDetail ? myDetail.headImgUrl : ''}
        />
      </Box>
      {myDetail && (
        <AccountPopover
          anchorEl={anchorRef.current}
          onClose={() => setOpenPopover(false)}
          open={openPopover}
        />
      )}
    </>
  );
};

export default AccountButton;
