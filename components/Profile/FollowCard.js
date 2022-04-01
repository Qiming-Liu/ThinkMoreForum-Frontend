import React from 'react';
import NextLink from 'next/link';
import { Avatar, Box, Card, CardHeader, Divider, Grid } from '@mui/material';

const FollowCard = (props) => {
  const { follow, title } = props;

  return (
    <Card {...props}>
      <CardHeader title={title} />
      <Divider />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {follow.map((fo) => (
            <Grid item key={fo.id} md={2} xs={12}>
              <NextLink
                href={{
                  pathname:
                    title === 'Following'
                      ? `/profile/${fo.followedUsers.username}`
                      : `/profile/${fo.users.username}`,
                }}
                passHref
              >
                <Avatar
                  src={
                    title === 'Following'
                      ? fo.followedUsers.headImgUrl
                      : fo.users.headImgUrl
                  }
                  sx={{
                    height: 56,
                    width: 56,
                  }}
                />
              </NextLink>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
};

export default FollowCard;
