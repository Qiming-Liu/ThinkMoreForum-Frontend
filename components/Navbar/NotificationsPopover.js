import React, { useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
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
import DraftsIcon from '@mui/icons-material/Drafts';
import CloseIcon from '@mui/icons-material/Close';
import {
  getNotifications,
  markAsViewed,
  markAllAsViewed,
} from '../../services/Notification';
import Scrollbar from '../Scrollbar';
import MyTime from '../../utils/myTime';
import { useWSContext } from '../../contexts/WSContext';

const NotificationsPopover = (props) => {
  const { anchorEl, onClose, onUpdateUnread, open, ...other } = props;
  const [fetch, setFetch] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const { updateInfo } = useWSContext();

  useEffect(() => {
    (async () => {
      const { data } = await getNotifications();
      setNotifications(data);
    })();
  }, [fetch, updateInfo]);

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
            <DraftsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {Object.keys(notifications).length === 0 ? (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2">There is no notification</Typography>
        </Box>
      ) : (
        <Scrollbar sx={{ maxHeight: 400 }}>
          <List disablePadding>
            {notifications.map(
              ({ id, triggerUsers, context, createTimestamp }) => (
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
                        <CloseIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <>
                    <NextLink
                      href={{
                        pathname: `/profile/${triggerUsers.username}`,
                      }}
                      passHref
                    >
                      <ListItemAvatar sx={{ mt: 0.5, cursor: 'pointer' }}>
                        <Avatar src={triggerUsers.headImgUrl} />
                      </ListItemAvatar>
                    </NextLink>
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
                          {MyTime(createTimestamp)}
                        </Typography>
                      }
                      sx={{ my: 0 }}
                    />
                  </>
                </ListItem>
              ),
            )}
          </List>
        </Scrollbar>
      )}
    </Popover>
  );
};

export default NotificationsPopover;
