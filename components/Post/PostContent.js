import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Divider,
  Tooltip,
  Typography,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import NextLink from 'next/link';
import { parser } from '../../utils/htmlParser.ts';
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
    handleRemind(post.postUsers.username);
  };

  const checkAuth = () => {
    if (checkPermission('postManagement', myDetail.role)) return true;
    return false;
  };

  return (
    <>
      <Head>
        <title>ThinkMore Forum | {post.title}</title>
      </Head>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Typography variant="h4" sx={{ mt: 0.7 }} style={{ fontSize: '34px' }}>
          {post.title}
        </Typography>
        {myDetail && checkAuth() && <AdminTool />}
      </Stack>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 2.5, mb: 3.5 }}
      >
        <Grid item>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <NextLink
              href={{
                pathname: userProfileUrl,
              }}
              passHref
            >
              <Avatar
                src={post.postUsers.headImgUrl}
                sx={{ cursor: 'pointer' }}
              />
            </NextLink>
            <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}>
              <Typography variant="subtitle2">
                By {post.postUsers.username}
              </Typography>
              <Typography variant="subtitle2" sx={{ ml: 0.8 }}>
                • {MyTime(post.createTimestamp)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
          <Tooltip
            title={isFavored ? 'Unfavorite this post' : 'Favorite this post'}
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
      <Box sx={{ py: 3 }}> {parser(post.context)}</Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
};

export default PostContent;
