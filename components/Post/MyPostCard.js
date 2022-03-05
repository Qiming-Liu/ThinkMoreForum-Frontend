import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Switch,
  Typography,
  Grid,
} from '@mui/material';
import { changePostVisibility } from '../../services/Post';
import hotToast from '../../utils/hotToast';

const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

const MyPostCard = (props) => {
  const {
    id,
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
    visibility,
    ...other
  } = props;

  const [invisible, setInvisible] = useState(!visibility);

  const handleVisibility = async () => {
    const { data: response } = await changePostVisibility(id);
    if (!response) {
      hotToast('error', 'Failed to change the visibility of this post.');
    } else {
      setInvisible(!invisible);
    }
  };

  return (
    <Card
      sx={{
        '& + &': {
          mt: 3,
        },
        position: 'relative',
      }}
      {...other}
    >
      {headImg && (
        <NextLink href={generatedUrl ?? ''} passHref>
          <CardMedia component="a" image={headImg} sx={{ height: 280 }} />
        </NextLink>
      )}
      <CardContent>
        <Grid container xs={12} justifyContent="space-between">
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 0.2 }}>
              {invisible ? 'Set Post to visible' : 'Set Post to invisible'}
            </Typography>
            <Switch
              checked={invisible}
              onChange={handleVisibility}
              color="primary"
            />
          </Box>
        </Grid>
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
            {abstract.length > 200
              ? `${abstract.substring(0, 200)}...`
              : abstract}
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

export default MyPostCard;
