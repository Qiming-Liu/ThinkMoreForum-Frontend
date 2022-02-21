import { React, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { blueGrey } from '@mui/material/colors';

const Profile = () => {
  const [currentTab, setCurrentTab] = useState('posts');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const profileimg = {
    cover: '/cover_1.jpg',
    avatar: '/avatar-cao-yu.png',
  };

  const tabs = [
    { label: 'Posts', value: 'posts' },
    { label: 'Comments', value: 'comments' },
  ];

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
              front-end developer
            </Typography>
            <Typography variant="h6">Tydias</Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link
              href="localhost:3000"
              underline="hover"
              variant="caption"
              sx={{
                color: blueGrey[700],
              }}
            >
              Following
            </Link>
            <Link
              href="localhost:3000"
              underline="hover"
              variant="caption"
              sx={{
                color: blueGrey[700],
              }}
            >
              Follower
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
      <Box sx={{ mt: 5 }}>
        <Container maxWidth="lg">
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Container>
      </Box>
    </Box>
  );
};

export default Profile;
