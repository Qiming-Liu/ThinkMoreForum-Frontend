import _ from 'lodash';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const RoleTable = ({
  setRole,
  confirmDialog,
  setConfirmDialog,
  headerList,
  role,
}) => {
  const undeletedList = ['banned_user', 'general_user', 'admin'];
  const roleList = role.map((r) => r.filter((x, index) => index !== 0));
  const onDelete = async (index) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setRole(role.filter((x, i) => i !== index));
  };
  const handleChange = (event) => {
    const i = JSON.parse(event.target.name);
    const roles = role;

    roles[i.indexH][i.indexW + 1] = event.target.checked;

    const roleCopy = _.cloneDeep(roles);

    setRole(roleCopy);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerList.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {roleList.map((oneRole, indexH) => (
            <TableRow key={oneRole}>
              {oneRole.map((value, indexW) => {
                return typeof value === 'string' || value instanceof String ? (
                  <TableCell>{value}</TableCell>
                ) : (
                  <TableCell>
                    <Checkbox
                      name={JSON.stringify({ indexH, indexW })}
                      checked={value}
                      onChange={handleChange}
                    />
                  </TableCell>
                );
              })}
              {undeletedList.includes(oneRole[0]) || (
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(indexH);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleTable;
