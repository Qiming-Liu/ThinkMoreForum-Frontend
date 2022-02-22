import React from 'react';
import PropTypes from 'prop-types';
// import { formatDistanceToNow } from 'date-fns';
import { Avatar, Box, Typography } from '@mui/material';

const BlogComment = (props) => {
  const {
    authorAvatar,
    authorName,
    authorRole,
    content,
    createdAt,
    isLiked: isLikedProp,
    likes: likesProp,
    ...other
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        pb: 3,
      }}
      {...other}
    >
      <Avatar src={authorAvatar} />
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.100',
          borderRadius: 1,
          ml: 2,
          p: 2,
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
          <Typography variant="subtitle2">{authorName}</Typography>
          {/* <Typography
            color="textSecondary"
            variant="caption"
          >
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </Typography> */}
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

BlogComment.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorRole: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
};

export default BlogComment;
