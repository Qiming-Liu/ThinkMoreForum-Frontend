import React from 'react';
import { Avatar, Box, Typography, Button, Stack } from '@mui/material';
import myTime from '../../utils/myTime';

const ProfileComment = ({ comment, replies }) => {
  const user = comment.postUsers;
  const timeStamp = new Date(comment.createTimestamp);
  const replieStyle = {
    marginTop: '15px',
    marginLeft: '5px',
    marginBottom: '-30px',
  };
  return (
    <Box
      sx={{
        display: 'flex',
        pb: 4,
        mr: 2,
        // pl: 5,
      }}
    >
      <Stack>
        <Avatar src={user.headImgUrl} />
        <Button
          onClick={() => {}}
          sx={{
            ml: -0.5,
            pl: 0,
          }}
          size="small"
          variant="outline"
        >
          Reply
        </Button>
      </Stack>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.100',
          borderRadius: 3,
          p: 1,
          width: '100%',
        }}
      >
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle2">{user.username}</Typography>
          <Typography color="textSecondary" variant="caption">
            {myTime(timeStamp)}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {comment.context}
        </Typography>
        {replies !== null && (
          <div style={replieStyle}>
            {replies.map((reply) => (
              <ProfileComment comment={reply} key={reply.id} replies={[]} />
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ProfileComment;
