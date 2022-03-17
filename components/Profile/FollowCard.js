import React from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Paper,
} from '@mui/material';
import DotsHorizontal from '../../icons/dots-horizontal';

const FollowCard = (props) => {
  const { follow, title } = props;

  return (
    <Card {...props}>
      <CardHeader title={title} />
      <Divider />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {follow.map((fo) => {
            console.log(fo.followedUsers.id);
            return (
              <Grid item key={fo.id} md={6} xs={12}>
                <Paper sx={{ height: '100%' }} variant="outlined">
                  <Box
                    sx={{
                      display: 'flex',
                      p: 2,
                    }}
                  >
                    {title === 'Following' && (
                      <NextLink
                        href={{
                          pathname: `/profile/${fo.followedUsers.username}`,
                          query: { userId: fo.followedUsers.id },
                        }}
                        passHref
                      >
                        <Avatar
                          component="a"
                          src={fo.followedUsers.headImgUrl}
                          sx={{
                            height: 56,
                            width: 56,
                          }}
                        />
                      </NextLink>
                    )}
                    {title === 'Follower' && (
                      <NextLink
                        href={{
                          pathname: `/profile/${fo.users.username}`,
                          query: { userId: fo.users.id },
                        }}
                        passHref
                      >
                        <Avatar
                          component="a"
                          src={fo.users.headImgUrl}
                          sx={{
                            height: 56,
                            width: 56,
                          }}
                        />
                      </NextLink>
                    )}
                    <Box
                      sx={{
                        flexGrow: 1,
                        mx: 2,
                      }}
                    >
                      {title === 'Following' && (
                        <NextLink
                          href={{
                            pathname: `/profile/${fo.followedUsers.username}`,
                            query: { userId: fo.followedUsers.id },
                          }}
                          passHref
                        >
                          {/* <Link color="textPrimary" variant="subtitle2"> */}
                          {fo.followedUsers.username}
                          {/* </Link> */}
                        </NextLink>
                      )}
                      {title === 'Follower' && (
                        <NextLink
                          href={{
                            pathname: `/profile/${fo.users.username}`,
                            query: { userId: fo.users.id },
                          }}
                          passHref
                        >
                          {/* <Link color="textPrimary" variant="subtitle2"> */}
                          {fo.users.username}
                          {/* </Link> */}
                        </NextLink>
                      )}
                      {/* <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      {connection.commonConnections} connections in common
                    </Typography> */}
                    </Box>
                    <IconButton>
                      <DotsHorizontal fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Card>
  );
};

export default FollowCard;
