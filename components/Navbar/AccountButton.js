import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Box, ButtonBase } from '@mui/material';
import UserCircleIcon from '../../icons/user-circle';
import AccountPopover from './AccountPopover';
import { getMyUser } from '../../services/Users';
import { setDetailAction } from '../../store/actions/signAction';

const AccountButton = ({ isLogin }) => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [myDetail, setMyDetail] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      (async () => {
        const { data } = await getMyUser();
        dispatch(setDetailAction(data));
        setMyDetail(data);
      })();
    }
  }, [dispatch, isLogin]);

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
          // eslint-disable-next-line no-nested-ternary
          src={isLogin ? (myDetail ? myDetail.profileImgUrl : '') : ''}
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
