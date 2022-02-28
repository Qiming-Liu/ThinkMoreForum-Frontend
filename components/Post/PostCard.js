import React from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';

const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

const PostCard = (props) => {
  const {
    generatedUrl,
    authorAvatar,
    authorName,
    headImg,
    createTimeStamp,
    abstract,
    title,
    commentCount,
    viewCount,
    followCount,
    ...other
  } = props;

  return (
    <Card
      sx={{
        '& + &': {
          mt: 3,
        },
      }}
      {...other}
    >
      {headImg && (
        <NextLink href={generatedUrl ?? ''} passHref>
          <CardMedia component="a" image={headImg} sx={{ height: 280 }} />
        </NextLink>
      )}
      <CardContent>
        <NextLink href={generatedUrl ?? ''} passHref>
          <Link
            href={generatedUrl ?? ''}
            color="textPrimary"
            component="a"
            variant="h5"
          >
            {title}
          </Link>
        </NextLink>
        {abstract && (
          <Typography
            color="textSecondary"
            sx={{
              height: 48,
              mt: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
            variant="body1"
          >
            {abstract}
          </Typography>
        )}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            mt: 2,
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Avatar src={authorAvatar} sx={{ mr: 2 }}>
              {getInitials(authorName)}
            </Avatar>
            <Typography variant="subtitle2">
              {`By ${authorName} • ${createTimeStamp}`}
            </Typography>
          </Box>
          <Typography
            align="right"
            color="textSecondary"
            sx={{ flexGrow: 1 }}
            variant="body2"
          >
            {`${viewCount} views • ${commentCount} comments • ${followCount} users following`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
