/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import styled from 'styled-components';
import {
  Button,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
} from '@mui/material';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import { useSelector } from 'react-redux';
import { usePinPostContext } from './PinPostContext';

const AdminToolWrapper = styled.div`
  display: flex;
  background-color: transparent;
`;

const AdminTool = () => {
  const { isLogin, myDetail } = useSelector((state) => state.sign);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { isPinned, completeUnpinPost, completePinPost } = usePinPostContext();

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = useCallback((event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  const prevOpen = useRef(open);

  const isPinViewable = useMemo(() => {
    if (isPinned) {
      return (
        <MenuItem
          onClick={(e) => {
            completeUnpinPost();
            handleClose(e);
          }}
        >
          Unpin
        </MenuItem>
      );
    }
    return (
      <MenuItem
        onClick={(e) => {
          completePinPost();
          handleClose(e);
        }}
      >
        Pin
      </MenuItem>
    );
  }, [completePinPost, completeUnpinPost, isPinned]);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AdminToolWrapper>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<HandymanOutlinedIcon fontSize="small" />}
      >
        Admin
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {isPinViewable}
                  <MenuItem onClick={handleClose}>Hide</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </AdminToolWrapper>
  );
};

export default AdminTool;
