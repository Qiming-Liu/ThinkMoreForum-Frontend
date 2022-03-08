import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { getMyUser } from '../../services/Users';

const Form = (props) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await getMyUser();
      setDetails(data);
    })();
  });

  const user = {
    avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
    name: details.username,
    email: details.email,
  };

  const [emailState, setIsEditingEmail] = useState('Edit');
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  // 是否成功验证邮箱
  const ifEmailVerified = false;

  const handleEditUsername = () => {
    setIsEditingUsername(!isEditingUsername);
  };

  const handleEditEmail = () => {
    if (emailState === 'Edit') {
      if (ifEmailVerified) {
        setIsEditingEmail('Save');
      } else {
        setIsEditingEmail('Send');
      }
    } else if (emailState === 'Save') {
      setIsEditingEmail('Edit');
    } else if (emailState === 'Send') {
      setIsEditingEmail('Sent');
    } else if (emailState === 'Sent') {
      if (ifEmailVerified === true) {
        setIsEditingEmail('Save');
      }
    }
  };

  return (
    <Grid sx={{ mt: 1 }} {...props} container direction="column" spacing={5}>
      <Grid item>
        <Typography sx={{ mb: 3 }} variant="h4">
          Settings
        </Typography>
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
                  <TextField
                    disabled={!isEditingUsername}
                    value={user.name}
                    InputLabelProps={{ shrink: !!details }}
                    // defaultValue={user.name}
                    label="Username"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />
                  <Button onClick={handleEditUsername}>
                    {isEditingUsername ? 'Save' : 'Edit'}
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    mt: 3,
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    disabled={emailState === 'Edit'}
                    value={user.email}
                    InputLabelProps={{ shrink: !!details }}
                    label="Email Address"
                    required
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />
                  <Button onClick={handleEditEmail}>{emailState}</Button>
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
