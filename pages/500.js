import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NotFound = () => {
  const theme = useTheme();
  const router = useRouter();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Head>
        <title>Error: Internal Server | ThinkMoreForum</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
            500 : Internal Server Error
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Box
              alt=""
              component="img"
              src="/error500.svg"
              sx={{
                height: 400,
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Button
              component="a"
              variant="outlined"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
