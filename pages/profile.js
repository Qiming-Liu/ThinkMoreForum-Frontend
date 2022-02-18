import { React } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Typography,
} from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { blueGrey } from '@mui/material/colors';

const Profile = () => {
  const profileimg = {
    cover: '/static/mock-images/social/cover_1.jpg',
    avatar: '/static/mock-images/avatars/avatar-cao-yu.png',
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          // style={{ backgroundImage: `url(${profile.cover})` }}
          style={{ backgroundImage: `url(${profileimg.cover})` }}
          sx={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: 1,
            height: 348,
            position: 'relative',
            '&:hover': {
              '& button': {
                visibility: 'visible',
              },
            },
          }}
        >
          <Button
            startIcon={<AddPhotoIcon fontSize="small" />}
            sx={{
              backgroundColor: blueGrey[900],
              bottom: {
                lg: 24,
                xs: 'auto',
              },
              color: 'common.white',
              position: 'absolute',
              right: 24,
              top: {
                lg: 'auto',
                xs: 24,
              },
              visibility: 'hidden',
              '&:hover': {
                backgroundColor: blueGrey[900],
              },
            }}
            variant="contained"
          >
            Change Cover
          </Button>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            mt: 5,
          }}
        >
          <Avatar
            src={profileimg.avatar}
            sx={{
              height: 64,
              width: 64,
            }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography color="textSecondary" variant="overline">
              {'front-end developer'}
            </Typography>
            <Typography variant="h6">{'Tydias'}</Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link
              href="#"
              underline="hover"
              variant="caption"
              sx={{
                color: blueGrey[700],
              }}
            >
              {'Following'}
            </Link>
            <Link
              href="#"
              underline="hover"
              variant="caption"
              sx={{
                color: blueGrey[700],
              }}
            >
              {'Follower'}
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                md: 'block',
                xs: 'none',
              },
            }}
          >
            <Button
              // onClick={handleConnectToggle}
              size="small"
              // startIcon={(
              //   <UserAddIcon fontSize="small" />
              // )}
              sx={{ ml: 2 }}
              variant="outlined"
            >
              Follow
            </Button>
            <Button
              component="a"
              size="small"
              // startIcon={(
              //   <ChatIcon fontSize="small" />
              // )}
              sx={{ ml: 1 }}
              variant="contained"
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
