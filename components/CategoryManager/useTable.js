import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  margin-top: 24px;
  position: relative;
  overflow: auto;
  max-width: 100%;
  width: 1100px;
  margin-right: 100px;
  & .MuiTable-root {
    position: relative;
    overflow: auto;
    max-width: 100%;
    width: 1100px;
    margin-right: 100px;
  }
  & thead th {
    font-weight: 600;
    text-align: center;
  }
  & tbody td {
    font-weight: 300;
    text-align: center;
  }
  & tbody tr:hover {
    background-color: #fffbf2;
    cursor: pointer;
  }
`;

const useTable = (records, headCells, filterFn) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const TblContainer = ({ children }) => <StyledTable>{children}</StyledTable>;

  const TblHead = () => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const recordsAfterPagingAndSorting = () => {
    return Object.values(filterFn.fn(records));
  };

  return {
    TblContainer,
    TblHead,
    recordsAfterPagingAndSorting,
  };
};

export default useTable;
