import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Typography,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  CardContent,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Link,
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useUsersRoleContext } from './UsersRoleContext';
import { changeUsersRoles } from '../../services/Users';

export const AdminUser = ({ allUsers, ...rest }) => {
  const [users, setUsers] = useState(allUsers);
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [displayingUsers, setDisplayingUsers] = useState(
    users.slice(0, rowsPerPage),
  );

  const {
    usersToSubmit,
    setUsersToSubmit,
    addUsersToSubmit,
    deleteUsersToSubmit,
    deleteUserToSubmit,
    findInstanceByUserId,
  } = useUsersRoleContext();

  const numOfPreSelectedUsers = displayingUsers.filter((displayingUser) => {
    if (
      usersToSubmit.find(
        (userToSubmit) => userToSubmit.id === displayingUser.id,
      )
    ) {
      return true;
    }
    return false;
  }).length;

  const handleSelectAll = (event) => {
    const newUsersToSubmit = displayingUsers;
    if (event.target.checked) {
      addUsersToSubmit(newUsersToSubmit);
    } else {
      deleteUsersToSubmit(newUsersToSubmit);
    }
  };

  const handleSelectOne = (_event, user) => {
    if (_event.target.checked) {
      addUsersToSubmit([user]);
    } else {
      deleteUserToSubmit(user);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getInstanceByUserId = (user, userList) => {
    const targetUserInList = userList.find((item) => item.id === user.id);
    return targetUserInList;
  };

  const lookFor = (text, textArray) => {
    const regex = new RegExp(text, 'i');
    return textArray.filter((element) => {
      const compareResult = regex.test(element.name);
      return compareResult;
    });
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    const newUsersPool = lookFor(e.target.value, allUsers);
    setUsers(newUsersPool);
  };

  const handleSubmit = () => {
    changeUsersRoles(usersToSubmit);
    setUsersToSubmit([]);
    router.replace(router.asPath);
  };

  const handleRoleChange = (event, user) => {
    const updatedUser = { ...user, role: event.target.value };
    setUsersToSubmit((prevUsersInfo) =>
      prevUsersInfo.map((prevUserInfo) => {
        if (prevUserInfo.id !== updatedUser.id) {
          return prevUserInfo;
        }
        return updatedUser;
      }),
    );
    setDisplayingUsers((prevUsersInfo) =>
      prevUsersInfo.map((prevUserInfo) => {
        if (prevUserInfo.id !== updatedUser.id) {
          return prevUserInfo;
        }
        return updatedUser;
      }),
    );
  };

  useEffect(() => {
    setDisplayingUsers(
      users.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    );
  }, [page, rowsPerPage, users]);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <TextField
                label="Search User"
                placeholder="By Username"
                variant="outlined"
                onChange={(e) => handleSearchChange(e)}
              />
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                endIcon={<PublishIcon />}
                onClick={handleSubmit}
              >
                Submit changes
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 400 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        numOfPreSelectedUsers === displayingUsers.length &&
                        displayingUsers.length !== 0
                      }
                      color="primary"
                      indeterminate={
                        numOfPreSelectedUsers > 0 &&
                        numOfPreSelectedUsers < displayingUsers.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell style={{ maxWidth: '10rem' }}>
                    LastLoginTime
                  </TableCell>
                  <TableCell style={{ width: '13rem' }}>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayingUsers.map((customer) => {
                  const userEdited = getInstanceByUserId(
                    customer,
                    usersToSubmit,
                  );
                  const userProfileUrl = `/profile/${customer.name}`;
                  return (
                    <TableRow
                      hover
                      key={customer.id}
                      selected={findInstanceByUserId(customer, usersToSubmit)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={findInstanceByUserId(
                            customer,
                            usersToSubmit,
                          )}
                          onChange={(event) => handleSelectOne(event, customer)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <NextLink href={userProfileUrl} passHref>
                            <Link href={userProfileUrl}>
                              <Avatar src={customer.avatarUrl} sx={{ mr: 2 }} />
                            </Link>
                          </NextLink>
                          <NextLink href={userProfileUrl} passHref>
                            <Link href={userProfileUrl}>
                              <Typography color="textPrimary" variant="body1">
                                {customer.name}
                              </Typography>
                            </Link>
                          </NextLink>
                        </Box>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell style={{ width: '10rem' }}>
                        {customer.logintime}
                      </TableCell>
                      <TableCell style={{ width: '13rem' }}>
                        <FormControl id={customer.id} variant="standard">
                          <Select
                            label="Role"
                            id={customer.id}
                            value={userEdited ? userEdited.role : customer.role}
                            onChange={(event) =>
                              handleRoleChange(event, customer)
                            }
                          >
                            <MenuItem value="admin">admin</MenuItem>
                            <MenuItem value="moderator">moderator</MenuItem>
                            <MenuItem value="verified_user">
                              verified user
                            </MenuItem>
                            <MenuItem value="unverified_user">
                              unverified user
                            </MenuItem>
                            <MenuItem value="banned_user">banned user</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={users.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Card>
    </>
  );
};
export default AdminUser;
