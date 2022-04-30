import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import { getAllRoles, putRole } from '../../services/Role';
import ConfirmDialog from '../CategoryManager/ConfirmDialog';
import RoleTable from './RoleTable';
import RoleDialog from './RoleDialog';
import hotToast from '../../utils/hotToast';

const headerList = [
  'role name',
  'admin management',
  'post management',
  'make post',
  'post comment',
  'upload img',
  'search',
  'delete',
];

const header = [
  'adminManagement',
  'postManagement',
  'makePost',
  'postComment',
  'uploadImg',
  'search',
];

const Role = () => {
  const [role, setRole] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const convertRoleListToData = () => {
    const roleLists = [];
    const newRoleLists = role.map((value) => ({
      id: value[0],
      roleName: value[1],
    }));
    const newList = role.map((r) => r.filter((x) => typeof x === 'boolean'));
    newList.map((r) => {
      const result = Object.assign.apply(
        {},
        header.map((v, i) => ({ [v]: r[i] })),
      );
      roleLists.push(result);
    });
    newRoleLists.map(
      (value, index) =>
        (value.permission = JSON.stringify(roleLists[index])),
    );
    newRoleLists.map((t) =>
      Object.keys(t).forEach((key) => {
        if (t[key] === null) {
          delete t[key];
        }
      }),
    );
    return newRoleLists;
  };

  const convertDateToRoleList = (data) => {
    const roleL = [];
    data.map((value) => {
      const permission = JSON.parse(value.permission);
      const newRole = [];
      header.map((v) => {
        newRole.push(permission[v]);
      });
      roleL.push([value.id, value.roleName, ...newRole]);
    });
    return roleL;
  };
  const handlSaveChanges = async () => {
    try {
      const data = convertRoleListToData();
      await putRole(data);
      hotToast('success', 'Role updated successfully');
    } catch (error) {
      hotToast('error', 'Role updated failed');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: roles } = await getAllRoles();
      setRole(convertDateToRoleList(roles));
    };
    fetchData();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Add Role
        </Button>

        <Button variant="outlined" onClick={handlSaveChanges}>
          Save All
        </Button>
      </Stack>
      <RoleTable
        role={role}
        setRole={setRole}
        headerList={headerList}
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <RoleDialog
        role={role}
        setRole={setRole}
        headerList={headerList}
        open={isOpen}
        DialogClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Role;
