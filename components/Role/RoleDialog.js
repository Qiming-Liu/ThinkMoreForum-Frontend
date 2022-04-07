import _ from 'lodash';
import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Input from '../CategoryManager/controls/Input';
import hotToast from '../../utils/hotToast';

const RoleDialog = ({ setRole, role, headerList, open, DialogClose }) => {
  const headerLists = headerList.filter((x) => x !== 'action');
  const [name, setName] = useState();
  const [roleList, setRoleList] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const handleChange = (event) => {
    const i = JSON.parse(event.target.name);
    const roles = roleList;

    roles[i.index] = event.target.checked;

    const roleCopy = _.cloneDeep(roles);

    setRoleList(roleCopy);
  };

  const handleAdd = () => {
    if (!name) {
      hotToast('error', 'Role name is required!');
      return;
    }
    const newRole = role;
    newRole.push([null].concat([name].concat(roleList)));
    setRole(newRole);
    DialogClose();
  };
  return (
    <Dialog open={open} onClose={DialogClose} maxWidth="lg">
      <DialogTitle>New role</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headerLists.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input
                    sx={{ width: 120 }}
                    name="roleName"
                    label="Role Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </TableCell>
                {roleList.map((value, index) => {
                  return (
                    <TableCell>
                      <Checkbox
                        key={JSON.stringify({ index })}
                        label={JSON.stringify({ index })}
                        name={JSON.stringify({ index })}
                        checked={value}
                        onChange={handleChange}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleDialog;
