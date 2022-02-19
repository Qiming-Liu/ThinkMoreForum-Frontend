import * as React from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AdminUser } from '../components/Admin/AdminUser';
import { users } from './api/fake-users';

const Admin = () => (
  <>
    <Head>
      <title>Administration Page</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ mt: 2 }}>
          <AdminUser users={users} />
        </Box>
      </Container>
    </Box>
  </>
);

export default Admin;
