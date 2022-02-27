import React, { useState } from 'react';
import _ from 'lodash';
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

const headerList = ['name', 'read', 'write', 'delete'];

const roleList = [
  ['user1', true, true, true],
  ['user2', true, true, true],
  ['user3', true, true, true],
  ['user3', true, true, true],
  ['user3', true, true, true],
  ['user3', true, true, true],
  ['user3', true, true, true],
];

const Role = () => {
  const [role, setRole] = useState(roleList);

  const handleChange = (event) => {
    const i = JSON.parse(event.target.name);

    roleList[i.indexH][i.indexW] = event.target.checked;

    const roleCopy = _.cloneDeep(roleList);

    setRole(roleCopy);
  };

  return (
    <>
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
            {role.map((oneRole, indexH) => (
              <TableRow>
                {oneRole.map((value, indexW) => {
                  return typeof value === 'string' ||
                    value instanceof String ? (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" onClick={() => console.log(role)}>
        Output
      </Button>
    </>
  );
};

export default Role;
