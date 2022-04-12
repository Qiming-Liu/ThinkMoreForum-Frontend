import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';
import { RootStateOrAny, useSelector } from 'react-redux';
import Router from 'next/router';
import { AdminUser } from 'components/Admin/AdminUser';
import { getAllUsers } from 'services/Users';
import MyTime from 'utils/myTime';
import CommonContainer from 'components/Layout/CommonContainer';
import CategoriesTable from 'components/CategoryManager/CategoriesTable';
import SetFooter from 'components/Footer/SetFooter';
import Role from 'components/Role';
import checkPermission from 'utils/checkPermission';
import hotToast from 'utils/hotToast';

const tabs = [
  { label: 'Users', value: 'users' },
  { label: 'Categories', value: 'categories' },
  { label: 'Roles', value: 'roles' },
  { label: 'Footer', value: 'footer' },
];

const Admin = () => {
  const [currentTab, setCurrentTab] = React.useState('users');
  const [users, setUsers] = useState();
  const { myDetail } = useSelector((state: RootStateOrAny) => state.sign);

  const handleTabsChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
  ) => {
    setCurrentTab(value);
  };

  const checkAuth = React.useCallback(() => {
    if (!myDetail || !checkPermission('adminManagement', myDetail.role)) {
      hotToast('error', "You don't have admin management permission.");
      Router.push('/404');
    }
  }, [myDetail]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: responseAllUsersInfo } = await getAllUsers();
      const allUsers = responseAllUsersInfo.map((protoUserInfo: any) => {
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
      setUsers(allUsers);
    };
    checkAuth();
    if (myDetail) {
      fetchUsers();
    }
  }, [checkAuth, myDetail]);

  return (
    <CommonContainer>
      <Head>
        <title>Admin | ThinkMore Forum</title>
      </Head>
      <Box className="FixDirectionTrial">
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
        {currentTab === 'users' && users && <AdminUser allUsers={users} />}
        {currentTab === 'categories' && <CategoriesTable />}
        {currentTab === 'roles' && <Role />}
        {currentTab === 'footer' && <SetFooter />}
      </Box>
    </CommonContainer>
  );
};

export default Admin;
