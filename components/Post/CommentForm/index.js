import React, { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import { useSocketContext } from '../../../contexts/SocketContext';

const CommentForm = ({
  initialText = '',
  handleSubmit,
  login,
  mentionUser,
  mentionUserId,
}) => {
  const [context, setContext] = useState(initialText);
  const { sendReminder } = useSocketContext();
  const onSubmit = () => {
    if (mentionUser) {
      handleSubmit(`@${mentionUser} ${context}`);
      sendReminder(mentionUserId);
    } else {
      handleSubmit(context);
    }
  };
  if (!login) {
    return null;
  }
  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          multiline
          label="Add a comment"
          rows={3}
          onChange={(e) => setContext(e.target.value)}
          value={context}
          sx={{
            mt: 1,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          <Button sx={{ m: 1 }} type="submit" variant="contained">
            Post
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CommentForm;
