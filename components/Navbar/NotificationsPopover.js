import React, { useEffect, useMemo, useState, forwardRef } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SimpleBar from 'simplebar-react';
import MailOpenIcon from '../../icons/mail-open';
import XIcon from '../../icons/x';
import UserCircleIcon from '../../icons/user-circle';
import 'simplebar/dist/simplebar.min.css';
import {
  getNotifications,
  markAsViewed,
  markAllAsViewed,
} from '../../services/usersServices';

const ScrollbarRoot = styled(SimpleBar)``;
const Scrollbar = forwardRef((props, ref) => {
  return <ScrollbarRoot ref={ref} {...props} />;
});

const NotificationsPopover = (props) => {
  const { anchorEl, onClose, onUpdateUnread, open, ...other } = props;
  const [fetch, setFetch] = useState(true);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await getNotifications();
      setNotifications(data);
    })();
  }, [fetch]);

  const unread = useMemo(
    () =>
      notifications.reduce(
        (acc, notification) => acc + (notification.viewed ? 0 : 1),
        0,
      ),
    [notifications],
  );

  useEffect(() => {
    onUpdateUnread?.(unread);
  }, [onUpdateUnread, unread]);

  const handleMarkAllAsRead = async () => {
    await markAllAsViewed();
    setNotifications((prevState) =>
      prevState.map((notification) => ({
        ...notification,
        viewed: true,
      })),
    );
    setFetch(!fetch);
  };

  const handleRemoveOne = (notificationId) => {
    setNotifications((prevState) =>
      prevState.filter((notification) => notification.id !== notificationId),
    );
    markAsViewed(notificationId);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 380 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography color="inherit" variant="h6">
          Notifications
        </Typography>
        <Tooltip title="Mark all as read">
          <IconButton
            onClick={handleMarkAllAsRead}
            size="small"
            sx={{ color: 'inherit' }}
          >
            <MailOpenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {Object.keys(notifications).length === 0 ? (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2">
            There are no notifications
          </Typography>
        </Box>
      ) : (
        <Scrollbar sx={{ maxHeight: 400 }}>
          <List disablePadding>
            {notifications.map(({ id, createTimestamp, context, icon }) => (
              <ListItem
                divider
                key={id}
                sx={{
                  alignItems: 'flex-start',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  '& .MuiListItemSecondaryAction-root': {
                    top: '24%',
                  },
                }}
                secondaryAction={
                  <Tooltip title="Remove">
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveOne(id)}
                      size="small"
                    >
                      <XIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                }
              >
                <>
                  <ListItemAvatar sx={{ mt: 0.5 }}>
                    <Avatar src={icon}>
                      <UserCircleIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Typography sx={{ mr: 0.5 }} variant="body2">
                          {context}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography color="textSecondary" variant="caption">
                        {createTimestamp}
                      </Typography>
                    }
                    sx={{ my: 0 }}
                  />
                </>
              </ListItem>
            ))}
          </List>
        </Scrollbar>
      )}
    </Popover>
  );
};

export default NotificationsPopover;
