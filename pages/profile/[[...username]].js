import { React, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Stack,
  Button,
  Container,
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
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CommonContainer from '../../components/Layout/common-container';
import ProfilePost from '../../components/Profile/ProfilePost';
import ProfileFollow from '../../components/Profile/ProfileFollow';
import {
  followUser,
  unfollowUser,
  getFollowedStatus,
} from '../../services/Follow';
import { getUserById, getFollowing, getFollower } from '../../services/Public';
import hotToast from '../../utils/hotToast';
import {
  getMe as getCurrentUser,
  changeProfileImg,
} from '../../services/Users';
import ChangePicButton from '../../components/PersonalSetting/ChangePicButton';
import fileToBase64 from '../../utils/fileToBase64';
import upload from '../../services/Img';
import { setProfileImgAction } from '../../store/actions/signAction';
import SignDialog from '../../components/Sign/SignDialog';
import ImageCropper from '../../components/ImageCropper';
import { useWSContext } from '../../contexts/WSContext';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username, userId } = router.query;
  const [currentTab, setCurrentTab] = useState('posts');
  const [followedStatus, setFollowedStatus] = useState('not_followed');
  const [currentName, setCurrentName] = useState('');
  const [role, setRole] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [img, setImg] = useState('');
  const [currentImg, setCurrentImg] = useState('');
  const [currentProfileImg, setCurrentProfileImg] = useState('');
  const [countFollowing, setCountFollowing] = useState('');
  const [countFollower, setCountFollower] = useState('');
  const { isLogin } = useSelector((state) => state.sign);
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
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          hotToast(
            'error',
            `Sorry, the profile image could not be updated, please contact support@thinkmoreapp.com.`,
          );
        });
      setLoading(false);
      setCropImage(undefined);
    },
  });

  // Get current user details
  useEffect(() => {
    if (router.isReady) {
      const getUser = async () => {
        const { data } = await getCurrentUser();
        const { data: responsefollowing } = await getFollowing(data.username);
        const { data: responsefollower } = await getFollower(data.username);
        setCurrentName(data.username);
        setCurrentRole(data.role.roleName);
        setCurrentImg(data.headImgUrl);
        setCurrentProfileImg(data.profileImgUrl);
        if (!username) {
          setFollowedStatus('current_user');
        } else if (username[0] === currentName) {
          setFollowedStatus('current_user');
        }
        setCountFollowing(responsefollowing.length);
        setCountFollower(responsefollower.length);
      };
      const getOtherUser = async () => {
        const { data } = await getUserById(userId);
        const { data: responsefollowing } = await getFollowing(data.username);
        const { data: responsefollower } = await getFollower(data.username);
        setRole(data.role.roleName);
        setImg(data.headImgUrl);
        setCurrentProfileImg(data.profileImgUrl);
        setCountFollowing(responsefollowing.length);
        setCountFollower(responsefollower.length);
      };
      const checkStatus = async (name) => {
        const { data } = await getFollowedStatus(name);
        if (data === true) {
          setFollowedStatus('followed');
        }
      };
      if (!isLogin) {
        setFollowedStatus('not login');
      }
      if (userId) {
        getOtherUser();
      }
      if (isLogin) {
        getUser();
        if (username && username[0] !== currentName) {
          checkStatus(username);
          getOtherUser();
        }
      }
    }
  }, [currentName, isLogin, router.isReady, userId, username]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handleFollowAction = async (name) => {
    try {
      if (followedStatus === 'not_followed') {
        await followUser(name);
        hotToast('success', `Follow ${name} successfully!`);
      }
      if (followedStatus === 'followed') {
        hotToast('success', ` Unfollowed ${name}`);
        await unfollowUser(name);
      }
      setFollowedStatus((prevFollowedStatus) =>
        prevFollowedStatus === 'not_followed' ? 'followed' : 'not_followed',
      );
      handleRemind(userId);
    } catch (err) {
      hotToast('error', 'Something went wrong!');
    }
  };

  // Here the [file] related to the problem of getting native object.
  const handleImgChange = async ([file]) => {
    const data = await fileToBase64(file);
    setCurrentProfileImg(data);
    setCropImage(file);
    setIsOpen(true);
  };

  const tabs = [
    { label: 'Posts', value: 'posts' },
    { label: 'Favorite', value: 'favorite' },
    {
      label: `Following ${countFollowing === 0 ? '' : countFollowing}`,
      value: 'following',
    },
    {
      label: `Follower ${countFollower === 0 ? '' : countFollower}`,
      value: 'follower',
    },
  ];
  return (
    <CommonContainer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box
            style={{
              backgroundImage: `url(${currentProfileImg})`,
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
            {followedStatus === 'current_user' && (
              <form onSubmit={formik.handleSubmit}>
                {(!cropImage || cropImage === currentProfileImg) && (
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
                    <ChangePicButton
                      accept="image/jpg,image/png, image/jpeg"
                      maxFiles={1}
                      onDrop={handleImgChange}
                      maxSize={5242880}
                      minsize={0}
                      color="inherit"
                    />
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
                src={username ? img : currentImg}
              />
              <Box sx={{ ml: 2 }}>
                {!username && (
                  <Typography color="textSecondary" variant="overline">
                    {currentRole}
                  </Typography>
                )}
                {username && (
                  <Typography color="textSecondary" variant="overline">
                    {role}
                  </Typography>
                )}
                <Typography variant="h6">{username || currentName}</Typography>
              </Box>
              {followedStatus === 'not_followed' && (
                <Button
                  onClick={() => {
                    handleFollowAction(username[0]);
                  }}
                  size="small"
                  startIcon={<PersonAddAltRoundedIcon fontSize="small" />}
                  sx={{ ml: 1 }}
                  variant="contained"
                >
                  Follow
                </Button>
              )}
              {followedStatus === 'followed' && (
                <Button
                  onClick={() => {
                    handleFollowAction(username[0]);
                  }}
                  color="primary"
                  size="small"
                  startIcon={<PersonRoundedIcon fontSize="small" />}
                  sx={{ ml: 1 }}
                  variant="outlined"
                >
                  Following
                </Button>
              )}
              {followedStatus === 'current_user' && (
                <Button
                  onClick={() => {
                    router.push('/personal-setting');
                  }}
                  color="primary"
                  size="small"
                  startIcon={<PersonIcon fontSize="small" />}
                  sx={{ ml: 1 }}
                  variant="outlined"
                >
                  Edit Profile
                </Button>
              )}
            </Stack>
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
              {currentTab === 'posts' && !username && (
                <ProfilePost
                  title="Posts"
                  value={currentName}
                  isMyself={followedStatus === 'current_user'}
                />
              )}
              {currentTab === 'posts' && username && (
                <ProfilePost
                  title="Posts"
                  value={username}
                  isMyself={followedStatus === 'current_user'}
                />
              )}
              {currentTab === 'favorite' && (
                <ProfilePost title="Favorite" value={username || currentName} />
              )}
              {currentTab === 'following' && (
                <ProfileFollow
                  title="Following"
                  value={username || currentName}
                />
              )}
              {currentTab === 'follower' && (
                <ProfileFollow
                  title="Follower"
                  value={username || currentName}
                />
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
          </Container>
        </Box>
      </Box>
    </CommonContainer>
  );
};

export default Profile;
