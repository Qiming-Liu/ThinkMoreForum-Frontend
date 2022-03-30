import React from 'react';
import Head from 'next/head';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Tooltip,
  Typography,
  Grid,
  IconButton,
  Link,
  Stack,
} from '@mui/material';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import NextLink from 'next/link';
import hotToast from '../../utils/hotToast';
import MyTime from '../../utils/myTime';
import AdminTool from './AdminTool';
import { useWSContext } from '../../contexts/WSContext';
import checkPermission from '../../utils/checkPermission';

const PostContent = ({ post, isFavored, toggleFav }) => {
  const { myDetail } = useSelector((state) => state.sign);
  const userProfileUrl = `/profile/${post.postUsers.username}`;
  const { handleRemind } = useWSContext();

  const handleClick = async () => {
    await toggleFav();
    handleRemind(post.postUsers.id);
  };

  const checkAuth = () => {
    if (checkPermission('postManagement', myDetail.role)) return true;
    return false;
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography variant="h3" sx={{ mt: 3, mb: 3 }}>
              {post.title}
            </Typography>
            {myDetail && checkAuth() && <AdminTool />}
          </Stack>
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
                <NextLink
                  href={{
                    pathname: userProfileUrl,
                  }}
                  passHref
                >
                  <Link
                    href={{
                      pathname: userProfileUrl,
                    }}
                  >
                    <Avatar src={post.postUsers.headImgUrl} />
                  </Link>
                </NextLink>
                <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}>
                  <NextLink
                    href={{
                      pathname: userProfileUrl,
                    }}
                    passHref
                  >
                    <Link
                      href={{
                        pathname: userProfileUrl,
                      }}
                    >
                      <Typography variant="subtitle2">
                        By {post.postUsers.username}
                      </Typography>
                    </Link>
                  </NextLink>
                  <Typography variant="subtitle2" sx={{ ml: 0.8 }}>
                    • {MyTime(post.createTimestamp)}
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
                arrow
              >
                <IconButton
                  color="primary"
                  onClick={
                    myDetail
                      ? handleClick
                      : () => {
                          hotToast(
                            'error',
                            'Please log in first to favorite this post',
                          );
                        }
                  }
                >
                  {isFavored ? (
                    <GradeRoundedIcon fontSize="medium" />
                  ) : (
                    <GradeOutlinedIcon fontSize="medium" />
                  )}
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Box
            sx={{
              backgroundImage: `url(${post.headImgUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: 1,
              height: 380,
              mt: 3,
            }}
          />
          <Box sx={{ py: 3 }}> {parse(post.context)}</Box>

          <Divider sx={{ my: 3 }} />
        </Container>
      </Box>
    </>
  );
};

export default PostContent;
