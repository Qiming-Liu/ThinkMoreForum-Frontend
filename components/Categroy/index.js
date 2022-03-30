import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Avatar,
  Box,
  Card,
  Grid,
  Typography,
  Link,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { getPostById } from '../../services/Public';
import MyTime from '../../utils/myTime';

const useStyles = makeStyles(
  {
    CustomPaper: {
      'transition-timing-function': 'ease-in-out',
      transition: 'transform 0.4s',
      '&:hover': {
        transform: 'translateX(-2%) translateY(-1%)',
      },
      'box-shadow': '4px 4px 8px grey',
    },
  },
  { name: 'MuiCustomPaper_toAvoidClassNameNotMatch' },
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
        setPostHeadImg(headImgUrl);
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
        <Link href={`/category/${title}`} underline="none">
          <Paper elevation={24} className={classes.CustomPaper}>
            <Card
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
              }}
            >
              <Grid
                item
                xs={5}
                sm={5}
                sx={{ borderRadius: 3, backgroundColor: color, ml: 2, p: 10 }}
              >
                <Image src={headImgUrl} height="200" width="200" alt="logo" />
              </Grid>
              <Grid
                item
                xs={7}
                sm={7}
                sx={{ display: 'flex', flexDirection: 'column', m: 5, my: 6 }}
              >
                <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    color="#0d47a1"
                    xs={4}
                    sx={{
                      backgroundColor: '#18ffff',
                      borderRadius: 2,
                      p: 1,
                      px: 2,
                    }}
                    variant="h4"
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
                      ml: 4,
                      justifyContent: 'center',
                    }}
                  >
                    <Typography color="inherit" variant="h4">
                      {title}
                    </Typography>
                    <Typography
                      color="#9e9e9e"
                      sx={{ mt: 1 }}
                      variant="subtitle2"
                    >
                      Last Updated : {MyTime(lastUpdateTimestamp)}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  color="#bdbdbd"
                  sx={{ fontWeight: 'light', mt: 1, my: 2 }}
                  variant="subtitle2"
                >
                  {description}
                </Typography>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Avatar src={pinPostHeadImg} sx={{ mr: 2 }} />
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
                  <Box
                    style={{
                      position: 'relative',
                      mt: 4,
                    }}
                  >
                    <Typography
                      color="#0d47a1"
                      sx={{
                        backgroundColor: '#18ffff',
                        borderRadius: '50%',
                        p: 1,
                        px: 2,
                        mx: 1,
                        position: 'absolute',
                        top: 5,
                        left: '50%',
                        zIndex: 'tooltip',
                      }}
                      variant="subtitle2"
                    >
                      <b>{participantCount}</b>
                    </Typography>
                    <Typography
                      color="white"
                      sx={{
                        border: 1,
                        backgroundColor: color,
                        borderRadius: 3,
                        p: 1.5,
                        pl: 7,
                        pr: 3,
                        position: 'absolute',
                      }}
                      variant="subtitle2"
                    >
                      participants
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      mt: 4,
                    }}
                  >
                    <TextSnippetIcon sx={{ color: { color } }} />
                    <Typography
                      color={color}
                      variant="subtitle2"
                      sx={{ m: 1, mr: 3 }}
                    >
                      {postCount} Posts
                    </Typography>
                    <VisibilityIcon sx={{ color: { color } }} />
                    <Typography color={color} variant="subtitle2" sx={{ m: 1 }}>
                      {viewCount} Views
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Card>
          </Paper>
        </Link>
      </NextLink>
    </Grid>
  );
};
export default Category;
