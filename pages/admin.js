import * as React from 'react';
import Head from 'next/head';
import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';
import { AdminUser } from '../components/Admin/AdminUser';
import { getAllUsers } from '../services/Public';
import MyTime from '../utils/myTime';
import { UsersRoleContextProvider } from '../components/Admin/UsersRoleContext';
import Categories from '../components/CategoryManager/categoryTable/Categories';

const tabs = [
  { label: 'Users', value: 'users' },
  { label: 'Categories', value: 'categories' },
  { label: 'Roles', value: 'roles' },
];

export const getServerSideProps = async () => {
  const { data: responseAllUsersInfo } = await getAllUsers();
  const users = responseAllUsersInfo.map((protoUserInfo) => {
    const user = {
      id: protoUserInfo.id,
      logintime: MyTime(protoUserInfo.lastLoginTimestamp),
      avatarUrl: protoUserInfo.headImgUrl,
      createdAt: MyTime(protoUserInfo.createTimestamp),
      email: protoUserInfo.email,
      name: protoUserInfo.username,
      role: protoUserInfo.role.roleName,
    };
    return user;
  });
  return { props: { users } };
};

const Admin = ({ users }) => {
  const [currentTab, setCurrentTab] = React.useState('users');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <UsersRoleContextProvider>
      <Head>
        <title>Administration | ThinkMoreForum</title>
      </Head>
      <Box>
        <Typography variant="h4">Admin</Typography>
        <Tabs
          indicatorColor="primary"
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="primary"
          value={currentTab}
          variant="scrollable"
          sx={{ mt: 3 }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              sx={{ fontSize: 15 }}
            />
          ))}
        </Tabs>
        <Divider sx={{ mb: 3 }} />
        {currentTab === 'users' && <AdminUser allUsers={users} />}
        {currentTab === 'categories' && <Categories />}
        {currentTab === 'roles' && <div>roles</div>}
      </Box>
    </UsersRoleContextProvider>
  );
};

export default Admin;
