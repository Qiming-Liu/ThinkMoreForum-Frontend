import * as React from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AdminUser } from '../components/Admin/AdminUser';

const users = [
  {
    id: 1,
    logintime: '13/01/2022',
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'ekaterina.tankova@devias.io',
    name: 'Ekaterina Tankova',
    role: 'Admin',
  },
  {
    id: 2,
    logintime: '13/01/2022',
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: 1555016400000,
    email: 'cao.yu@devias.io',
    name: 'Cao Yu',
    role: 'Admin',
  },
];

const Admin = () => (
  <>
    <Head>
      <title>Administration | ThinkMoreForum</title>
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
