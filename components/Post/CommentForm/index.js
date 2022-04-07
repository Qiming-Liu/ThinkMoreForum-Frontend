import React, { useState } from 'react';
import {
  Button,
  Box,
  TextField,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import checkPermission from '../../../utils/checkPermission';
import hotToast from '../../../utils/hotToast';
import Sign from '../../Sign';
import { useWSContext } from '../../../contexts/WSContext';

const CommentForm = ({
  handleSubmit,
  login,
  mentionUsername,
  parentCommentIsRoot,
  closeComment,
}) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [context, setContext] = useState('');
  const { handleRemind } = useWSContext();
  const { myDetail } = useSelector((state) => state.sign);

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkPermission('postComment', myDetail.role)) {
      if (mentionUsername) {
        handleSubmit(
          parentCommentIsRoot ? `${context}` : `@${mentionUsername} ${context}`,
        );
        handleRemind(mentionUsername);
        setContext('');
        closeComment();
      } else {
        handleSubmit(context);
        setContext('');
      }
    } else {
      hotToast('error', "You don't have permission to comment");
    }
  };
  if (!login) {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box mt={4}>
          <h2>Login is required to {mobileDevice || 'post'} comment</h2>
        </Box>
        <Box mt={2}>
          <Sign />
        </Box>
      </Grid>
    );
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
