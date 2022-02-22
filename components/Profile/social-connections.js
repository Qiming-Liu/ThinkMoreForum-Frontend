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
  Typography,
} from '@mui/material';
import DotsHorizontal from '../../icons/dots-horizontal';

const connections = [
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
    commonConnections: 10,
    name: 'Carson Darrin',
    status: 'rejected',
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/static/mock-images/avatars/avatar-fran_perez.png',
    commonConnections: 8,
    name: 'Fran Perez',
    status: 'pending',
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/static/mock-images/avatars/avatar-miron_vitold.png',
    commonConnections: 5,
    name: 'Miron Vitold',
    status: 'not_connected',
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    avatar: '/static/mock-images/avatars/avatar-penjani_inyene.png',
    commonConnections: 1,
    name: 'Penjani Inyene',
    status: 'connected',
  },
];

const SocialConnections = (props) => {
  return (
    <Card {...props}>
      <CardHeader title="Following" />
      <Divider />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {connections.map((connection) => (
            <Grid item key={connection.id} md={6} xs={12}>
              <Paper sx={{ height: '100%' }} variant="outlined">
                <Box
                  sx={{
                    display: 'flex',
                    p: 2,
                  }}
                >
                  <NextLink href="/" passHref>
                    <Avatar
                      component="a"
                      src={connection.avatar}
                      sx={{
                        height: 56,
                        width: 56,
                      }}
                    />
                  </NextLink>
                  <Box
                    sx={{
                      flexGrow: 1,
                      mx: 2,
                    }}
                  >
                    <NextLink href="/" passHref>
                      {/* <Link color="textPrimary" variant="subtitle2"> */}
                      {connection.name}
                      {/* </Link> */}
                    </NextLink>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      {connection.commonConnections} connections in common
                    </Typography>
                  </Box>
                  <IconButton>
                    <DotsHorizontal fontSize="small" />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
};

export default SocialConnections;
