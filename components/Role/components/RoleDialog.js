import _ from 'lodash';
import React, { useState } from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import Input from '../../CategoryManager/controls/Input';
import hotToast from '../../../utils/hotToast';

const RoleDialog = ({ setRole, role, onClose, headerList }) => {
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

  const handleSave = () => {
    if (!name) {
      hotToast('error', 'Role name is required!');
      return;
    }
    const newRole = role;
    newRole.push([null].concat([name].concat(roleList)));
    setRole(newRole);
    onClose(false);
  };
  return (
    <>
      <Typography variant="h4" align="center">
        Create a new role
      </Typography>
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
      <Button
        sx={{ mt: 1 }}
        variant="outlined"
        color="primary"
        size="large"
        fullWidth
        onClick={handleSave}
      >
        Save
      </Button>
    </>
  );
};

export default RoleDialog;
