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
  const [Email_state, setIsEditing__Emil] = useState("Edit");
  const [isEditing__Ps, setIsEditing__Ps] = useState(false);
  const [isEditing__FullName, setIsEditing__FullName] = useState(false);


  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

 
  const handleEdit__FullName = () => {
    setIsEditing__FullName(!isEditing__FullName);
  };
    const handleEdit__Ps = () => {
    setIsEditing__Ps(!isEditing__Ps);
  };


  const handleEdit__Emil = () => {

    if(Email_state ==="Edit"){
      if(if_Emil_verified){
        setIsEditing__Emil("Save");
      }else{
        setIsEditing__Emil("Sent");
      }
    }else if(Email_state ==="Save"){
      setIsEditing__Emil("Edit");
    }else if(Email_state ==="Sent"){
      setIsEditing__Emil("Send");
    }else if(Email_state ==="Send"){
      if(if_Emil_verified === true){
        setIsEditing__Emil("Save");
      }
      
      
      
    }
  };

  //是否成功验证邮箱
  let if_Emil_verified = false;

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
                {/*full name */}
                  <TextField
                    disabled={!isEditing__FullName}
                    defaultValue={user.name}
                    label="Full Name"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />
                  <Button onClick={handleEdit__FullName}>
                    {isEditing__FullName ? 'Save' : 'Edit'}
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    mt: 3,
                    alignItems: 'center',
                  }}
                >
                {/*email */}
                  <TextField
                    disabled={Email_state === "Edit" ? true : false}
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
                  <Button onClick={handleEdit__Emil}>
                    
                      {Email_state }
                     
                    
                  </Button>
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
              <Typography variant="h6">Change Password</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
        
              </Box>
              
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center',
                }}
              >
              {/*Old ps */}
                <TextField
                  disabled={!isEditing__Ps}
                  label="Old Password"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 11,
                  }}
                />
             
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center',
                }}
              >
              {/*new ps */}
                <TextField
                  disabled={!isEditing__Ps}
                  label="New Password"
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
                <Button onClick={handleEdit__Ps}>
                {isEditing__Ps ? 'Save' : 'Edit'}
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
