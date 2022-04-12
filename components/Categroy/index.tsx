import React from 'react';
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
import MyTime from '../../utils/myTime';
import Participants from './Participants';
import { PostProps } from '../Post/PostCard';

interface CategoryProps {
  color: string | never;
  title: string | never;
  description: string | never;
  pinPost: PostProps;
  postCount: number | never;
  viewCount: number | never;
  participantCount: number | never;
  headImgUrl: string | never;
  lastUpdateTimestamp: any;
}

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

const Category = ({
  color,
  title,
  description,
  pinPost,
  postCount,
  viewCount,
  participantCount,
  headImgUrl,
  lastUpdateTimestamp,
}: CategoryProps) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('lg'));
  const classes = useStyles();

  const date = new Date(
    lastUpdateTimestamp.substring(0, 4),
    lastUpdateTimestamp.substring(5, 7) - 1,
    lastUpdateTimestamp.substring(8, 10),
  );

  const longMonth = date.toLocaleString('en-us', { month: 'short' });

  return (
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
          mb: 2.5,
        }}
        style={{
          width: '100%',
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
              p: 2,
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
              <Typography color="#9e9e9e" variant="subtitle2">
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
            <Avatar
              src={pinPost ? pinPost.headImgUrl : ''}
              variant="square"
              style={{
                borderRadius: '5px',
              }}
            >
              {pinPost ? null : <ArticleIcon />}
            </Avatar>
            <Typography variant="subtitle2" sx={{ ml: 2 }}>
              {pinPost ? pinPost.title : 'No Pinned Post Yet'}
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
                color="#222429"
                variant="subtitle2"
                sx={{ m: 1, mr: 4 }}
              >
                {postCount}
              </Typography>
              <VisibilityIcon sx={{ color: 'primary.main' }} />
              <Typography color="#222429" variant="subtitle2" sx={{ m: 1 }}>
                {viewCount}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </NextLink>
  );
};
export default Category;
