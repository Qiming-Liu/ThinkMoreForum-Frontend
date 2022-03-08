import React, { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';

const CommentForm = ({ initialText = '', handleSubmit, login }) => {
  const [context, setContext] = useState(initialText);
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(context);
    setContext('');
  };

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
          <div>
            {login ? (
              <Button
                sx={{ m: 1 }}
                type="submit"
                variant="contained"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Post
              </Button>
            ) : (
              <Button sx={{ m: 1 }} type="submit" variant="contained" disabled>
                Login First
              </Button>
            )}
          </div>
        </Box>
      </Box>
    </form>
  );
};

export default CommentForm;
