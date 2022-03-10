import * as React from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AdminUser } from '../components/Admin/AdminUser';
import { getAllUsers } from '../services/Public';
import MyTime from '../utils/myTime';
import { UsersRoleContextProvider } from '../contexts/UsersRoleContext';

export const getServerSideProps = async () => {
  const { data: responseAllUsersInfo } = await getAllUsers();
  const users = responseAllUsersInfo.map((protoUserInfo) => {
    const user = {
      id: protoUserInfo.id,
      logintime: MyTime(protoUserInfo.lastLoginTimestamp).toString(),
      avatarUrl: protoUserInfo.profileImgUrl,
      createdAt: MyTime(protoUserInfo.createTimestamp).toString(),
      email: protoUserInfo.email,
      name: protoUserInfo.username,
      role: protoUserInfo.role.roleName,
    };
    return user;
  });
  return { props: { users } };
};

const Admin = ({ users }) => {
  return (
    <UsersRoleContextProvider>
      <Head>
        <title>Administration | ThinkMoreForum</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: '1000px',
        }}
      >
        <Container>
          <Box sx={{ mt: 2 }}>
            <AdminUser users={users} />
          </Box>
        </Container>
      </Box>
    </UsersRoleContextProvider>
  );
};

export default Admin;
