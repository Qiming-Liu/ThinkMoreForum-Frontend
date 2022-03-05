import React from 'react';
import Head from 'next/head';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import {
  Box,
  Chip,
  Container,
  Divider,
  Typography,
  Avatar,
  Tooltip,
  Grid,
  Fab,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import hotToast from '../../utils/hotToast';
import MyTime from '../../utils/myTime';

const useStyles = makeStyles({
  favFab: {
    backgroundColor: '#e57373',
    '&:hover': {
      backgroundColor: 'default',
      '& $favIcon': {
        fill: '#d32f2f',
      },
    },
  },
  unFavFab: {
    backgroundColor: '#F5F5F5',
    '&:hover': {
      backgroundColor: '#ffebee',
      '& $unFavIcon': {
        fill: '#F7F7F7',
      },
    },
  },
  favIcon: {
    fill: '#F7F7F7',
  },
  unFavIcon: {
    fill: '#d32f2f',
  },
});

const PostContent = (props) => {
  const { isLogin } = useSelector((state) => state.sign);
  const classes = useStyles();
  const { post, isFavored, toggleFav } = props;

  const handleClick = () => {
    toggleFav();
  };
  return (
    <>
      <Head>
        <title>ThinkMoreForum | {post.title}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mt: 3, mb: 3 }}>
            {post.title}
          </Typography>
          <Chip label={post.category.title} />
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  mt: 3,
                }}
              >
                <Avatar src={post.postUsers.profileImg} />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2">
                    By {post.postUsers.username} •{' '}
                    {MyTime(post.createTimestamp)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sx={{ alignItems: 'center', display: 'flex', mt: 3 }}>
              <Tooltip
                title={
                  isFavored ? 'Unfavorite this post' : 'Favorite this post'
                }
                placement="top"
              >
                <Fab
                  aria-label="fav"
                  size="small"
                  className={isFavored ? classes.unFavFab : classes.favFab}
                  onClick={
                    isLogin
                      ? handleClick
                      : () => {
                          hotToast(
                            'error',
                            'Please log in first to favorite this post',
                          );
                        }
                  }
                >
                  <FavoriteIcon
                    className={isFavored ? classes.unFavIcon : classes.favIcon}
                  />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
          <Box
            sx={{
              backgroundImage: `url('/logo.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: 1,
              height: 380,
              mt: 3,
            }}
          />
          <Box sx={{ py: 3 }}> {post.context}</Box>

          <Divider sx={{ my: 3 }} />
        </Container>
      </Box>
    </>
  );
};

export default PostContent;
