import React from 'react';
import { Box, Grid, Typography, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';

const DefaultFooter = () => {
  const isMobile: boolean = useMediaQuery('(min-width:1200px)');
  return (
    <Box
      sx={
        isMobile
          ? {
              pb: 3,
              mt: 5,
              pt: {
                md: 3,
              },
            }
          : {
              pb: 3,
              mt: 4,
              pt: {
                md: 3,
              },
            }
      }
    >
      <Grid
        container
        sx={{
          display: 'flex',
        }}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant={isMobile ? 'h4' : 'h5'}
          sx={isMobile ? { mb: 5 } : { mb: 3 }}
        >
          What is ThinkMore Forum ?
        </Typography>
        <Stack
          direction={isMobile ? 'row' : 'column'}
          spacing={isMobile ? 6 : 4}
          justifyContent="space-between"
        >
          <Stack
            direction="column"
            spacing={isMobile ? 2 : 1}
            justifyContent="space-between"
          >
            <Typography variant={isMobile ? 'h6' : 'subtitle1'}>
              A community doing good
            </Typography>
            <Typography>
              ThinkMore Forum is place for people to make any kind of
              disscusion, where people come together to share their opinion.
              We’re also a community pushing for positive change for people, and
              the planet.
            </Typography>
          </Stack>
          <Stack
            direction="column"
            spacing={isMobile ? 2 : 1}
            justifyContent="space-between"
          >
            <Typography variant={isMobile ? 'h6' : 'subtitle1'}>
              Bring people Together
            </Typography>
            <Typography>
              ThinkMore Forum bring people together from all over the world. We
              are a community of people who are passionate about the world and
              the environment.
            </Typography>
          </Stack>
          <Stack
            direction="column"
            spacing={isMobile ? 2 : 1}
            justifyContent="space-between"
          >
            <Typography variant={isMobile ? 'h6' : 'subtitle1'}>
              Peace of mind
            </Typography>
            <Typography>
              Your privacy is the highest priority of our dedicated team. And if
              you ever need assistance, we are always ready to step in for
              support.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={1}
          justifyContent="space-between"
          sx={{ mt: 5 }}
        >
          {isMobile ? (
            <Image src="/logo.svg" height="50" width="50" alt="logo" />
          ) : (
            <Image src="/logo.svg" height="35" width="35" alt="logo" />
          )}

          <Typography
            color="textSecondary"
            sx={{ pt: 3, align: 'center' }}
            variant="caption"
          >
            © 2022 ThinkMore Forum. All Rights Reserved.
          </Typography>
        </Stack>
      </Grid>
    </Box>
  );
};

export default DefaultFooter;
