import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const PostCard = (props) => {
  const {
    authorAvatar,
    authorName,
    headImg,
    createTimeStamp,
    abstract,
    title,
    ...other
  } = props;

  return (
    <Card
      sx={{
        '& + &': {
          mt: 6,
        },
      }}
      {...other}
    >
      <NextLink href="/" passHref>
        <CardMedia component="a" image={headImg} sx={{ height: 280 }} />
      </NextLink>
      <CardContent>
        <NextLink href="/" passHref>
          <Link color="textPrimary" component="a" variant="h5">
            {title}
          </Link>
        </NextLink>
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
              By {authorName} • {createTimeStamp}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

PostCard.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  headImg: PropTypes.string.isRequired,
  createTimeStamp: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
