import React from 'react';
import { Box, Grid, Typography, Stack } from '@mui/material';
import Image from 'next/image';

const DefaultFooter = () => {
  return (
    <Box
      sx={{
        pb: 3,
        mt: 5,
        pt: {
          md: 3,
        },
      }}
    >
      <Grid
        sx={{
          display: 'flex',
        }}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" sx={{ mb: 5 }}>
          What is ThinkMoreForum ?
        </Typography>
        <Stack direction="row" spacing={6} justifyContent="space-between">
          <Stack direction="column" spacing={2} justifyContent="space-between">
            <Typography variant="h6">A community doing good</Typography>
            <Typography>
              ThinkMoreForum is place for people to make any kind of disscusion,
              where people come together to share their opinion. We’re also a
              community pushing for positive change for people, and the planet.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={2} justifyContent="space-between">
            <Typography variant="h6">Bring people Together</Typography>
            <Typography>
              ThinkMoreForum bring people together from all over the world. We
              are a community of people who are passionate about the world and
              the environment.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={2} justifyContent="space-between">
            <Typography variant="h6">Peace of mind</Typography>
            <Typography>
              Your privacy is the highest priority of our dedicated team. And if
              you ever need assistance, we are always ready to step in for
              support.
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="subtitle1" sx={{ mt: 4 }}>
          Have a question? Well, we’ve got some answers.
        </Typography>
        <Stack
          direction="column"
          spacing={1}
          justifyContent="space-between"
          sx={{ mt: 4 }}
        >
          <Image src="/logo.svg" height="35" width="35" alt="logo" />
          <Typography
            color="textSecondary"
            sx={{ pt: 2, align: 'center' }}
            variant="caption"
          >
            © 2022 ThinkMoreForum. All Rights Reserved.
          </Typography>
        </Stack>
      </Grid>
    </Box>
  );
};

export default DefaultFooter;
