import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Button, MenuItem, Menu, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { styled as muiStyled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { usePinPostContext } from './PinPostContext';
import { changePostVisibility } from '../../services/Post';
import hotToast from '../../utils/hotToast';
import checkPermission from '../../utils/checkPermission';

const AdminToolWrapper = styled.div`
  display: flex;
  background-color: transparent;
`;

const StyledMenu = muiStyled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 120,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const AdminTool = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { thisPost, isPinned, completeUnpinPost, completePinPost } =
    usePinPostContext();
  const [visible, setVisible] = useState(thisPost.visibility);
  const { myDetail } = useSelector((state) => state.sign);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleHide = useCallback(async () => {
    if (checkPermission('postManagement', myDetail.role)) {
      const { data: response } = await changePostVisibility(thisPost.id);
      if (!response) {
        hotToast('error', 'Failed to change the visibility of this post.');
      } else {
        setVisible(!visible);
      }
    } else {
      hotToast('error', "You don't have post management permission.");
    }
  }, [myDetail.role, thisPost.id, visible]);

  const handleEdit = useCallback(() => {
    const postId = thisPost.id;
    return checkPermission('postManagement', myDetail.role)
      ? router.push({
          pathname: '/post/edit-post',
          query: {
            postId,
          },
        })
      : hotToast('error', 'You do not have permission to edit post!');
  }, [myDetail.role, router, thisPost.id]);

  const isPinViewable = useMemo(() => {
    if (isPinned) {
      return (
        <MenuItem
          onClick={() => {
            completeUnpinPost();
            handleClose();
          }}
          disableRipple
        >
          <PushPinOutlinedIcon />
          Unpin
        </MenuItem>
      );
    }
    return (
      <MenuItem
        onClick={() => {
          completePinPost();
          handleClose();
        }}
        disableRipple
      >
        <PushPinIcon />
        Pin
      </MenuItem>
    );
  }, [completePinPost, completeUnpinPost, handleClose, isPinned]);

  return (
    <AdminToolWrapper>
      <Button
        id="customized-button"
        aria-controls={open ? 'customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={
          <KeyboardArrowDownIcon
            fontSize="large"
            style={{
              transition: 'all 0.5s',
              transform: open ? 'rotate(-180deg)' : '',
            }}
          />
        }
        sx={{ fontSize: 15, py: 0.8, px: 2 }}
      >
        Admin
      </Button>
      <StyledMenu
        id="customized-menu"
        MenuListProps={{
          'aria-labelledby': 'customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isPinViewable}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            handleHide();
            handleClose();
          }}
          disableRipple
        >
          {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          {visible ? 'Hide' : 'Expose'}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            handleEdit();
            handleClose();
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>
      </StyledMenu>
    </AdminToolWrapper>
  );
};

export default AdminTool;
