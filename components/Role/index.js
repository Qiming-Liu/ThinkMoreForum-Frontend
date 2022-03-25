import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { getAllRoles, putRole } from '../../services/Role';
import ConfirmDialog from '../CategoryManager/ConfirmDialog';
import RoleTable from './components/RoleTable';
import RoleDialog from './components/RoleDialog';
import SignDialog from '../Sign/SignDialog';
import hotToast from '../../utils/hotToast';

const headerList = [
  'role name',
  'admin management',
  'post management',
  'make post',
  'post comment',
  'upload img',
  'search',
  'action',
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
    // eslint-disable-next-line array-callback-return
    newList.map((r) => {
      const result = Object.assign.apply(
        {},
        header.map((v, i) => ({ [v]: r[i] })),
      );
      roleLists.push(result);
    });
    newRoleLists.map(
      // eslint-disable-next-line no-return-assign
      (value, index) =>
        // eslint-disable-next-line no-param-reassign
        (value.permission = JSON.stringify(roleLists[index])),
    );
    newRoleLists.map((t) =>
      Object.keys(t).forEach((key) => {
        if (t[key] === null) {
          // eslint-disable-next-line no-param-reassign
          delete t[key];
        }
      }),
    );
    return newRoleLists;
  };

  const convertDateToRoleList = (data) => {
    const roleL = [];
    // eslint-disable-next-line array-callback-return
    data.map((value) => {
      const permission = JSON.parse(value.permission);
      const newRole = [];
      // eslint-disable-next-line array-callback-return
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
      <Button sx={{ m: 1 }} variant="contained" onClick={() => setIsOpen(true)}>
        Add New Role
      </Button>
      <RoleTable
        role={role}
        setRole={setRole}
        headerList={headerList}
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Button
        sx={{ mt: 1 }}
        fullWidth
        variant="outlined"
        onClick={handlSaveChanges}
      >
        Save All Changes
      </Button>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <SignDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <RoleDialog
          role={role}
          setRole={setRole}
          onClose={setIsOpen}
          headerList={headerList}
        />
      </SignDialog>
    </>
  );
};

export default Role;
