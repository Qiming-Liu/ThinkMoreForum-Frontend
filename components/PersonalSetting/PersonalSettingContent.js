import * as React from 'react';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import PersonalSettingPassword from './PersonalSettingPassword';
// import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';

const Form = (props) => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
    name: 'Anika Visser',
  };

  const [emailState, setIsEditingEmail] = useState('Edit');
  const [isEditingFullname, setIsEditingFullname] = useState(false);

  // 是否成功验证邮箱
  const ifEmilVerified = false;

  const handleEditFullname = () => {
    setIsEditingFullname(!isEditingFullname);
  };

  const handleEditEmil = () => {
    if (emailState === 'Edit') {
      if (ifEmilVerified) {
        setIsEditingEmail('Save');
      } else {
        setIsEditingEmail('Send');
      }
    } else if (emailState === 'Save') {
      setIsEditingEmail('Edit');
    } else if (emailState === 'Send') {
      setIsEditingEmail('Sent');
    } else if (emailState === 'Sent') {
      if (ifEmilVerified === true) {
        setIsEditingEmail('Save');
      }
    }
  };

  return (
    <Grid sx={{ mt: 4 }} {...props} container direction="column" spacing={5}>
      <Grid item>
        <Card item>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Basic details</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Avatar
                    src={user.avatar}
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64,
                    }}
                  >
                    <div>goodddd</div>
                  </Avatar>
                  <Button>Change</Button>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    mt: 3,
                    alignItems: 'center',
                  }}
                >
                  {/* full name */}
                  <TextField
                    disabled={!isEditingFullname}
                    defaultValue={user.name}
                    label="Full Name"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />
                  <Button onClick={handleEditFullname}>
                    {isEditingFullname ? 'Save' : 'Edit'}
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    mt: 3,
                    alignItems: 'center',
                  }}
                >
                  {/* email */}
                  <TextField
                    disabled={emailState === 'Edit'}
                    defaultValue="xxx@xxx.com"
                    label="Email Address"
                    required
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderStyle: 'dashed',
                      },
                    }}
                  />
                  <Button onClick={handleEditEmil}>{emailState}</Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <PersonalSettingPassword />
      </Grid>
    </Grid>
  );
};

export default Form;
