import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Avatar,
  Box,
  Card,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArticleIcon from '@mui/icons-material/Article';
import { getPostById } from '../../services/Public';
import MyTime from '../../utils/myTime';
import Participants from './Participants';
import FourCorners from './CategoryPageComponents/FourCorners';

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
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
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
    <Grid item>
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
            borderRadius: '20px',
          }}
        >
          {mobileDevice || (
            <Grid
              item
              xs={4}
              sx={{
                borderRadius: 4,
                backgroundColor: color,
                ml: 3,
                my: 3,
                p: 4,
              }}
            >
              <Image src={headImgUrl} height="300" width="300" alt="logo" />
            </Grid>
          )}
          <Grid
            item
            xs={mobileDevice ? 12 : 7}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 4,
              my: 2,
              justifyContet: 'space-between',
              alignItems: 'flex-start',
            }}
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
                <Typography color="#222429" variant="h4">
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
            <Typography color="#6b778d" sx={{ my: 2 }} variant="subtitle2">
              {description}
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                my: 2,
                ml: 0.5,
              }}
            >
              <FourCorners borderColor="red">
                <Avatar
                  src={pinPostHeadImg}
                  variant="square"
                  style={{
                    borderRadius: '5px',
                  }}
                >
                  {pinPostHeadImg === '' ? <ArticleIcon /> : null}
                </Avatar>
              </FourCorners>
              <Typography variant="subtitle2" style={{ marginLeft: '20px' }}>
                {pinPostTitle}
              </Typography>
            </Box>
            <Grid
              container
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <Participants count={participantCount} />
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <ArticleIcon sx={{ color: 'primary.main' }} />
                <Typography
                  color={color}
                  variant="subtitle2"
                  sx={{ m: 1, mr: 4 }}
                >
                  {postCount}
                </Typography>
                <VisibilityIcon sx={{ color: 'primary.main' }} />
                <Typography color={color} variant="subtitle2" sx={{ m: 1 }}>
                  {viewCount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </NextLink>
    </Grid>
  );
};
export default Category;
