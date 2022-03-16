import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, ButtonBase } from '@mui/material';
import UserCircleIcon from '../../icons/user-circle';
import AccountPopover from './AccountPopover';
import { getMyUser } from '../../services/Users';
import { setDetailAction } from '../../store/actions/signAction';
import store from '../../store/store';

const AccountButton = ({ isLogin }) => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [myDetails, setMyDetails] = useState(undefined);
  const [headImg, setHeadImg] = useState(undefined);
  const dispatch = useDispatch();
  const { myDetail } = useSelector((state) => state.sign);

  useEffect(() => {
    if (isLogin) {
      (async () => {
        const { data } = await getMyUser();
        dispatch(setDetailAction(data));
        setMyDetails(data);
        setHeadImg(data.headImgUrl);
      })();
    }
  }, [dispatch, isLogin]);

  if (!myDetails) {
    return null;
  }

  if (myDetail) {
    const checkHeadImg = (state) => state.sign.myDetail.headImgUrl;
    const latestHeadImg = checkHeadImg(store.getState());
    if (latestHeadImg !== headImg) {
      setHeadImg(latestHeadImg);
    }
  }

  if (!myDetail) {
    return null;
  }

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
          src={headImg || ''}
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
