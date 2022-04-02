import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { Avatar, Box, Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArticleIcon from '@mui/icons-material/Article';
import { getPostById } from '../../services/Public';
import MyTime from '../../utils/myTime';
import Participants from './Participants';

const useStyles = makeStyles(
  {
    CustomCard: {
      'transition-timing-function': 'ease-in-out',
      transition: 'transform 0.4s',
      '&:hover': {
        transform: 'translateX(-0.5%) translateY(-1.5%)',
      },
    },
  },
  { name: 'MuiCustomCard_toAvoidClassNameNotMatch' },
);

const Category = (props) => {
  const classes = useStyles();
  const {
    color,
    title,
    description,
    pinPost,
    postCount,
    viewCount,
    participantCount,
    headImgUrl,
    lastUpdateTimestamp,
  } = props;

  const [pinPostTitle, setPinPostTitle] = useState('');

  const [pinPostHeadImg, setPostHeadImg] = useState('');

  useEffect(() => {
    (async () => {
      if (pinPost) {
        const { data } = await getPostById(pinPost.id);
        setPinPostTitle(data.title);
        setPostHeadImg(data.headImgUrl);
      } else {
        setPinPostTitle('No Pinned Post Yet');
        setPostHeadImg('');
      }
    })();
  }, [headImgUrl, pinPost]);

  const date = new Date(
    lastUpdateTimestamp.substring(0, 4),
    lastUpdateTimestamp.substring(5, 7) - 1,
    lastUpdateTimestamp.substring(8, 10),
  );

  const longMonth = date.toLocaleString('en-us', { month: 'short' });

  return (
    <Grid item xs={12}>
      <NextLink href={`/category/${title}`} passHref>
        <Card
          className={classes.CustomCard}
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            cursor: 'pointer',
          }}
        >
          <Grid
            item
            xs={5}
            sm={5}
            sx={{
              borderRadius: 4,
              backgroundColor: color,
              ml: 3,
              p: 4,
            }}
          >
            <Image src={headImgUrl} height="300" width="300" alt="logo" />
          </Grid>
          <Grid
            item
            xs={7}
            sm={7}
            sx={{ display: 'flex', flexDirection: 'column', m: 5, my: 5 }}
          >
            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                color="#0d47a1"
                xs={4}
                sx={{
                  backgroundColor: '#18ffff',
                  borderRadius: 2,
                  p: 1,
                  px: 1.75,
                  py: 0.75,
                }}
                variant="h5"
                align="center"
              >
                <small>{longMonth}</small>
                <br />
                <b>{lastUpdateTimestamp.substring(8, 10)}</b>
              </Typography>
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  ml: 2,
                  justifyContent: 'center',
                }}
              >
                <Typography color="inherit" variant="h4">
                  {title}
                </Typography>
                <Typography
                  color="#9e9e9e"
                  // sx={{ mt: 0 }}
                  variant="subtitle2"
                >
                  Last Updated : {MyTime(lastUpdateTimestamp)}
                </Typography>
              </Grid>
            </Grid>
            <Typography
              color="#6b778d"
              sx={{ mt: 2, my: 2 }}
              variant="subtitle2"
            >
              {description}
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                mt: 1,
              }}
            >
              <Avatar
                src={pinPostHeadImg}
                sx={{ ml: 1, mr: 2, bgcolor: 'primary.main' }}
                variant="square"
              >
                {pinPostHeadImg === '' ? <ArticleIcon /> : null}
              </Avatar>
              <Typography variant="subtitle2">{pinPostTitle}</Typography>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Participants count={participantCount} />
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  mt: 3,
                }}
              >
                <ArticleIcon sx={{ color: 'primary.main' }} />
                <Typography color={color} variant="subtitle2" sx={{ m: 1 }}>
                  {postCount}
                </Typography>
                <VisibilityIcon sx={{ color: 'primary.main' }} />
                <Typography color={color} variant="subtitle2" sx={{ m: 1 }}>
                  {viewCount}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Card>
      </NextLink>
    </Grid>
  );
};
export default Category;
