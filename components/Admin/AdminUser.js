import React, { useState } from 'react';
import { Avatar, Button, Link, Typography } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { changeUsersRoles } from '../../services/Users';
import useUsersToSubmit from './useUsersToSubmit';

const useStyles = makeStyles({
  customDataGrid: {
    '& .MuiTablePagination-selectLabel': {
      marginBottom: '0.2rem',
    },
    '& .MuiTablePagination-displayedRows': {
      marginBottom: 0,
    },
  },
});

const CustomToolbar = ({ handleSubmit }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button
        startIcon={<PublishIcon />}
        style={{ fontSize: '0.8125rem', padding: '7px 12px' }}
        onClick={handleSubmit}
      >
        Confirm
      </Button>
    </GridToolbarContainer>
  );
};

export const AdminUser = ({ allUsers }) => {
  const { usersToSubmit, setUsersToSubmit, addUsersToSubmit } =
    useUsersToSubmit();
  const classes = useStyles();
  const router = useRouter();
  const initialRows = allUsers.map((user) => {
    const userForDataGrid = {
      id: user.id,
      avatarUrl: user.avatarUrl,
      name: user.name,
      email: user.email,
      logintime: user.logintime,
      role: user.role,
    };
    return userForDataGrid;
  });

  const [rows, setRows] = useState(initialRows);

  const columns = [
    {
      field: 'avatarUrl',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => {
        const userProfileUrl = `/profile/${params.row.name}`;
        return (
          <NextLink
            href={{
              pathname: userProfileUrl,
              query: { userId: params.row.id },
            }}
            passHref
          >
            <Link
              href={{
                pathname: userProfileUrl,
                query: { userId: params.row.id },
              }}
            >
              <Avatar src={params.row.avatarUrl} sx={{ mr: 2 }} />
            </Link>
          </NextLink>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => {
        const userProfileUrl = `/profile/${params.row.name}`;
        return (
          <NextLink
            href={{
              pathname: userProfileUrl,
              query: { userId: params.row.id },
            }}
            passHref
          >
            <Link
              href={{
                pathname: userProfileUrl,
                query: { userId: params.row.id },
              }}
            >
              <Typography color="textPrimary" sx={{ fontSize: '0.875rem' }}>
                {params.row.name}
              </Typography>
            </Link>
          </NextLink>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'logintime', headerName: 'Last login', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      type: 'singleSelect',
      valueOptions: [
        'admin',
        'verified_user',
        'unverified_user',
        'banned_user',
      ],
      width: 200,
      editable: true,
    },
  ];

  const handleSubmit = () => {
    changeUsersRoles(usersToSubmit);
    setUsersToSubmit([]);
    router.replace(router.asPath);
  };

  const handleCellEditCommit = (params) => {
    const updatedUser = {
      id: params.id,
      [params.field]: params.value,
    };
    addUsersToSubmit(updatedUser);
    setRows((prev) =>
      prev.map((row) =>
        row.id === params.id ? { ...row, ...updatedUser } : row,
      ),
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        className={classes.customDataGrid}
        pageSize={10}
        rows={rows}
        columns={columns}
        onCellEditCommit={handleCellEditCommit}
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{
          toolbar: { handleSubmit },
        }}
        autoHeight
        density="comfortable"
      />
    </div>
  );
};

export default AdminUser;
