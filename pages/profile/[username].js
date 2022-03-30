import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Stack,
  Button,
  Typography,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonIcon from '@mui/icons-material/Person';
import { blueGrey } from '@mui/material/colors';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import CommonContainer from '../../components/Layout/common-container';
import ProfilePost from '../../components/Profile/ProfilePost';
import ProfileFollow from '../../components/Profile/ProfileFollow';
import {
  followUser,
  unfollowUser,
  getFollowedStatus,
} from '../../services/Follow';
import {
  getUserByUsername,
  getFollowing,
  getFollower,
} from '../../services/Public';
import hotToast from '../../utils/hotToast';
import { changeProfileImg } from '../../services/Users';
import upload from '../../services/Img';
import { setProfileImgAction } from '../../store/actions/signAction';
import SignDialog from '../../components/Sign/SignDialog';
import ImageCropper from '../../components/ImageCropper';
import { useWSContext } from '../../contexts/WSContext';

const Profile = () => {
  const dispatch = useDispatch();
  const { isLogin, myDetail } = useSelector((state) => state.sign);
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState(undefined);
  const [followedStatus, setFollowedStatus] = useState(false);
  const [currentTab, setCurrentTab] = useState('posts');
  const [currentProfileImg, setCurrentProfileImg] = useState('');
  const [countFollowing, setCountFollowing] = useState('');
  const [countFollower, setCountFollower] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [cropImage, setCropImage] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const { handleRemind } = useWSContext();

  const formik = useFormik({
    initialValues: {
      context: '',
      title: '',
    },
    onSubmit: async () => {
      setLoading(true);
      const { data: imgs } = await upload(cropImage).catch((error) => {
        hotToast('error', `Something wrong: ${error}`);
      });
      changeProfileImg({ profileImgUrl: imgs.url })
        .then(() => {
          hotToast('success', 'Profile picture is changed');
          dispatch(
            setProfileImgAction(
              imgs.url,
              () => {},
              (fail) => {
                hotToast('error', `something wrong${fail}`);
              },
            ),
          );
        })
        .catch(() => {
          hotToast('error', `Sorry, the profile image could not be updated.`);
        });
      setLoading(false);
      setCropImage(undefined);
    },
  });

  useEffect(() => {
    if (router.isReady) {
      const getUser = async () => {
        const { data } = await getUserByUsername(username);
        setUser(data);
      };
      const getFollow = async () => {
        const { data: responsefollowing } = await getFollowing(username);
        const { data: responsefollower } = await getFollower(username);
        setCountFollowing(responsefollowing.length);
        setCountFollower(responsefollower.length);
      };
      const checkFollowedStatus = async () => {
        const { data } = await getFollowedStatus(username);
        setFollowedStatus(data);
      };
      getUser();
      if (isLogin) {
        getFollow();
        if (myDetail.username !== username) {
          checkFollowedStatus();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, router.isReady, username]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handleFollowAction = async (name) => {
    try {
      if (!followedStatus) {
        await followUser(name);
        hotToast('success', `Follow ${name} successfully!`);
        setCountFollower(countFollower + 1);
      }
      if (followedStatus) {
        await unfollowUser(name);
        hotToast('success', ` Unfollowed ${name}`);
        setCountFollower(countFollower - 1);
      }
      setFollowedStatus(!followedStatus);
      handleRemind(user.id);
    } catch (err) {
      hotToast('error', 'Something went wrong!');
    }
  };

  // const handleImgChange = async ([file]) => {
  //   const data = await fileToBase64(file);
  //   setCurrentProfileImg(data);
  //   setCropImage(file);
  //   setIsOpen(true);
  // };

  const tabs = [
    { label: 'Posts', value: 'posts' },
    { label: 'Favorite', value: 'favorite' },
    {
      label: `Following ${countFollowing}`,
      value: 'following',
    },
    {
      label: `Follower ${countFollower}`,
      value: 'follower',
    },
  ];

  if (!username) return null;
  if (!user) return null;

  const followButton = () => {
    if (username === myDetail.username) {
      return (
        <Button
          onClick={() => {
            router.push('/setting');
          }}
          color="primary"
          size="small"
          startIcon={<PersonIcon fontSize="small" />}
          sx={{ ml: 1 }}
          variant="outlined"
        >
          Edit Profile
        </Button>
      );
    }
    return (
      <Button
        onClick={() => {
          handleFollowAction(username);
        }}
        size="small"
        startIcon={<PersonAddAltRoundedIcon fontSize="small" />}
        sx={{ ml: 1 }}
        variant={followedStatus ? 'outlined' : 'contained'}
      >
        {followedStatus ? 'Following' : 'Follow'}
      </Button>
    );
  };

  return (
    <CommonContainer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Box
          style={{
            backgroundImage: `url(${user.profileImgUrl})`,
          }}
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
          {myDetail && username === myDetail.username && (
            <form onSubmit={formik.handleSubmit}>
              {(!cropImage || cropImage === currentProfileImg) && (
                // <Button
                //   startIcon={<AddPhotoIcon fontSize="small" />}
                //   sx={{
                //     backgroundColor: blueGrey[900],
                //     bottom: {
                //       lg: 24,
                //       xs: 'auto',
                //     },
                //     color: 'common.white',
                //     position: 'absolute',
                //     right: 24,
                //     top: {
                //       lg: 'auto',
                //       xs: 24,
                //     },
                //     visibility: 'hidden',
                //     '&:hover': {
                //       backgroundColor: blueGrey[900],
                //     },
                //   }}
                //   variant="contained"
                // >
                //   <ChangePicButton
                //     accept="image/jpg,image/png, image/jpeg"
                //     maxFiles={1}
                //     onDrop={handleImgChange}
                //     maxSize={5242880}
                //     minsize={0}
                //     color="inherit"
                //   />
                // </Button>
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
              )}
              {cropImage && cropImage !== currentProfileImg && (
                <LoadingButton
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
                  }}
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  Confirm
                </LoadingButton>
              )}
            </form>
          )}
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            mt: 5,
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Avatar
              sx={{
                height: 64,
                width: 64,
              }}
              src={user.headImgUrl}
            />
            <Box sx={{ ml: 2 }}>
              {username && (
                <Typography color="textSecondary" variant="overline">
                  {user.role.roleName}
                </Typography>
              )}
              <Typography variant="h6">{username}</Typography>
            </Box>
            {isLogin && followButton()}
          </Stack>
        </Box>
        <Box sx={{ mt: 5 }}>
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
              <ProfilePost title="Posts" value={username} />
            )}
            {currentTab === 'favorite' && (
              <ProfilePost title="Favorite" value={username} />
            )}
            {currentTab === 'following' && (
              <ProfileFollow title="Following" value={username} />
            )}
            {currentTab === 'follower' && (
              <ProfileFollow title="Follower" value={username} />
            )}
          </Box>
          <SignDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ImageCropper
              src={currentProfileImg}
              alt="image"
              setCover={setCurrentProfileImg}
              setIsOpen={setIsOpen}
              setImage={setCropImage}
              file={cropImage}
            />
          </SignDialog>
        </Box>
      </Box>
    </CommonContainer>
  );
};

export default Profile;
