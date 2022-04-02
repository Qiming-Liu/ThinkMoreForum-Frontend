import React, { useRef, useState } from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsPopover from './NotificationsPopover';

const NotificationsButton = () => {
  const anchorRef = useRef(null);
  const [unread, setUnread] = useState(0);
  const [openPopover, setOpenPopover] = useState(false);

  const handleUpdateUnread = (value) => {
    setUnread(value);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          ref={anchorRef}
          sx={{ ml: 1 }}
          onClick={() => setOpenPopover(true)}
        >
          <Badge color="error" badgeContent={unread}>
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={anchorRef.current}
        onClose={() => setOpenPopover(false)}
        onUpdateUnread={handleUpdateUnread}
        open={openPopover}
      />
    </>
  );
};

export default NotificationsButton;
