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
// import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';

const Form = (props) => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
    name: 'Anika Visser',
  };
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
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
                  <TextField
                    defaultValue={user.name}
                    label="Full Name"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />
                  <Button>Save</Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    mt: 3,
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    defaultValue="dummy.account@gmail.com"
                    disabled
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
                  <Button>Edit</Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Card item>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Change password</Typography>
              </Grid>
              <Grid item md={8} sm={12} xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    disabled={!isEditing}
                    label="Password"
                    type="password"
                    defaultValue="Thebestpasswordever123#"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      ...(!isEditing && {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderStyle: 'dotted',
                        },
                      }),
                    }}
                  />
                  <Button onClick={handleEdit}>
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Form;
