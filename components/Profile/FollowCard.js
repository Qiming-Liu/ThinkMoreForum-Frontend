import React from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Tooltip,
} from '@mui/material';

const FollowCard = (props) => {
  const { follow, title } = props;

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          {follow.map((fo) => (
            <Grid item key={fo.id} md={1}>
              <NextLink
                href={{
                  pathname:
                    title === 'Following'
                      ? `/profile/${fo.followedUsers.username}`
                      : `/profile/${fo.users.username}`,
                }}
                passHref
              >
                <Tooltip
                  title={
                    title === 'Following'
                      ? fo.followedUsers.username
                      : fo.users.username
                  }
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
                      cursor: 'pointer',
                    }}
                  />
                </Tooltip>
              </NextLink>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FollowCard;
