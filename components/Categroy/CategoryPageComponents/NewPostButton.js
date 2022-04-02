import React, { useCallback } from 'react';
import { Slide, Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import checkPermission from '../../../utils/checkPermission';
import hotToast from '../../../utils/hotToast';
import { openSignDialog } from '../../../store/actions/signAction';

const NewPostButton = ({ categoryTitle }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLogin, myDetail } = useSelector((state) => state.sign);

  const permissionCheck = useCallback(() => {
    return checkPermission('makePost', myDetail.role)
      ? router.push({
          pathname: '/post/make-post',
          query: {
            categoryTitle,
          },
        })
      : hotToast('error', 'You do not have permission to make post!');
  }, [categoryTitle, myDetail, router]);

  const handleMakeNewPost = useCallback(() => {
    return isLogin ? permissionCheck() : dispatch(openSignDialog());
  }, [dispatch, isLogin, permissionCheck]);

  return (
    <Tooltip
      title="Make a post"
      placement="top"
      sx={{
        position: 'fixed',
        bottom: (theme) => theme.spacing(3),
        right: (theme) => theme.spacing(10),
      }}
    >
      <Slide
        direction="left"
        in
        style={{ transitionDelay: '1000ms' }}
        mountOnEnter
        unmountOnExit
      >
        <Fab
          size="medium"
          color="primary"
          aria-label="add"
          onClick={() => handleMakeNewPost()}
        >
          <AddIcon />
        </Fab>
      </Slide>
    </Tooltip>
  );
};

export default NewPostButton;
