import { React, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { blueGrey } from '@mui/material/colors';
import ProfilePost from '../components/Profile/ProfilePost';
import ProfileFollow from '../components/Profile/ProfileFollow';
import UserAdd from '../icons/user-add';
import { followUser, getFollowedStatus } from '../services/Follow';
import { getCurrentUser } from '../services/Users';
import hotToast from '../utils/hotToast';

const Profile = ({ username }) => {
  const [currentTab, setCurrentTab] = useState('posts');
  const [followedStatus, setFollowedStatus] = useState('not_followed');
  const [currentName, setCurrentName] = useState('');
  // const [role, setRole] = useState('null');
  const [currentRole, setCurrentRole] = useState('');

  // Get current user details
  useEffect(() => {
    const getUser = async () => {
      const { data } = await getCurrentUser();
      console.log(data);
      setCurrentName(data.username);
      setCurrentRole(data.role.roleName);
      if (!username) {
        setFollowedStatus('current_user');
      }
    };
    getUser();
  }, [username]);

  // Check follow status
  useEffect(() => {
    const checkStatus = async (name) => {
      const { data } = await getFollowedStatus(name);
      if (data === true) {
        console.log('you have followed this user');
        setFollowedStatus('followed');
      }
    };
    if (username) {
      checkStatus(username);
    }
  }, [username]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const profileimg = {
    cover: '/cover_1.jpg',
    avatar: '/logo.png',
  };

  const profile = {
    title: 'front-end developer',
    name: 'verified_user',
  };

  const handleFollowAction = async (name) => {
    try {
      await followUser(name);
      if (followedStatus === 'not_followed') {
        hotToast('success', `Follow ${name} successfully!`);
      }
      setFollowedStatus((prevFollowedStatus) =>
        prevFollowedStatus === 'not_followed' ? 'followed' : 'not_followed',
      );
    } catch (err) {
      hotToast('error', 'Something went wrong!');
    }
  };

  const tabs = [
    { label: 'Posts', value: 'posts' },
    { label: 'Favorite', value: 'favorite' },
    { label: 'Following', value: 'following' },
    { label: 'Follower', value: 'follower' },
  ];

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
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
            {!username && (
              <Typography color="textSecondary" variant="overline">
                {currentRole}
              </Typography>
            )}
            {/* 这里还有待修改 */}
            {username && (
              <Typography color="textSecondary" variant="overline">
                {profile.title}
              </Typography>
            )}
            <Typography variant="h6">{username || currentName}</Typography>
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
            {followedStatus === 'not_followed' && (
              <Button
                onClick={() => {
                  handleFollowAction(profile.name);
                }}
                size="small"
                startIcon={<UserAdd fontSize="small" />}
                sx={{ ml: 2 }}
                variant="outlined"
              >
                Follow
              </Button>
            )}
            {followedStatus === 'followed' && (
              <Button
                color="primary"
                onClick={() => {
                  handleFollowAction(profile.name);
                }}
                size="small"
                startIcon={<UserAdd fontSize="small" />}
                sx={{ ml: 2 }}
                variant="outlined"
              >
                Followed
              </Button>
            )}
            {followedStatus === 'current_user' && (
              <Button
                color="primary"
                size="small"
                startIcon={<UserAdd fontSize="small" />}
                sx={{ ml: 2 }}
                variant="outlined"
              >
                This is you!
              </Button>
            )}
            {/* 这个功能后面看情况再加 */}
            {/* <Button
              component="a"
              size="small"
              startIcon={<Chat fontSize="small" />}
              sx={{ ml: 1 }}
              variant="contained"
            >
              Send Message
            </Button> */}
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
          <Divider />
          <Box sx={{ py: 3 }}>
            {currentTab === 'posts' && (
              <ProfilePost title="Posts" value="moderator" />
            )}
            {currentTab === 'favorite' && (
              <ProfilePost title="Favorite" value="admin" />
            )}
            {currentTab === 'following' && (
              <ProfileFollow title="Following" value="verified_user" />
            )}
            {currentTab === 'follower' && (
              <ProfileFollow title="Follower" value="admin" />
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Profile;
