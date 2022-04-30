import React, { useEffect, useState, useMemo } from 'react';
import { Avatar, Button, Typography } from '@mui/material';
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
import { makeStyles } from '@mui/styles';
import { changeUsersRoles } from '../../services/Users';
import useUsersToSubmit from './useUsersToSubmit';
import { getAllRoles } from '../../services/Role';

interface UserProps {
  id: string;
  logintime: string | never;
  avatarUrl: string | never;
  createdAt: string | never;
  email: string | never;
  name: string;
  role: string | never;
}

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

const CustomToolbar = ({ handleSubmit }: { handleSubmit: () => void }) => {
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

export const AdminUser = ({ allUsers }: { allUsers: Array<UserProps> }) => {
  const { usersToSubmit, setUsersToSubmit, addUsersToSubmit } =
    useUsersToSubmit();
  const classes = useStyles();
  const Router = useRouter();
  const [roles, setRoles] = useState([]);

  const initialRows = allUsers.map((user: UserProps) => {
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

  const columns = useMemo(
    () => [
      {
        field: 'avatarUrl',
        headerName: 'Avatar',
        width: 100,
        renderCell: (params: any) => {
          return (
            <NextLink
              href={{
                pathname: `/profile/${params.row.name}`,
              }}
              passHref
            >
              <Avatar
                src={params.row.avatarUrl}
                sx={{ mr: 2, cursor: 'pointer' }}
              />
            </NextLink>
          );
        },
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 200,
        renderCell: (params) => {
          return (
            <Typography color="textPrimary" sx={{ fontSize: '0.875rem' }}>
              {params.row.name}
            </Typography>
          );
        },
      },
      { field: 'email', headerName: 'Email', width: 250 },
      { field: 'logintime', headerName: 'Last login', width: 200 },
      {
        field: 'role',
        headerName: 'Role',
        type: 'singleSelect',
        valueOptions: roles,
        width: 200,
        editable: true,
      },
    ],
    [roles],
  );

  const handleSubmit = () => {
    changeUsersRoles(usersToSubmit);
    setUsersToSubmit([]);
    Router.replace(Router.asPath);
  };

  const handleCellEditCommit = (params: any) => {
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

  useEffect(() => {
    const fetchRoles = async () => {
      const { data: rawRolesInfo } = await getAllRoles();
      const roleNames = rawRolesInfo.map((roleInfo: any) => roleInfo.roleName);
      setRoles(roleNames);
    };
    fetchRoles();
  }, []);

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
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default AdminUser;
