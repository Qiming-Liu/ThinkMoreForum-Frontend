import React from 'react';
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface DisplaySettingsSecondRowProps {
  sizePerPage: number;
  handleSizePerPage: () => void;
  handleInputSizePerPage: (event: any) => void;
  sortColumn: string;
  sortColumnList: any;
  handleSortColumn: (event: any) => void;
  toggleSortDirection: () => void;
  sortDirection: 'asc' | 'desc';
}

const DisplaySettingsSecondRow = ({
  sizePerPage,
  handleSizePerPage,
  handleInputSizePerPage,
  sortColumn,
  sortColumnList,
  handleSortColumn,
  toggleSortDirection,
  sortDirection,
}: DisplaySettingsSecondRowProps) => {
  return (
    <Grid item xs style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <TextField
        placeholder="1-20"
        size="small"
        id="outlined-basic"
        label="Posts/page"
        variant="outlined"
        type="number"
        defaultValue={sizePerPage}
        onChange={handleInputSizePerPage}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSizePerPage}
                size="small"
                color="primary"
              >
                <CheckIcon />
              </IconButton>
            </InputAdornment>
          ),
          inputProps: {
            max: 20,
            min: 1,
          },
        }}
      />
      <TextField
        size="small"
        sx={{ ml: 1 }}
        id="outlined-basic"
        label="Sorted by"
        variant="outlined"
        select
        value={sortColumn}
        onChange={handleSortColumn}
      >
        {Object.keys(sortColumnList).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button
        size="small"
        color="secondary"
        variant="contained"
        onClick={toggleSortDirection}
        sx={{ mt: 0.2, ml: 1 }}
        endIcon={sortDirection ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      >
        {sortDirection ? 'Descend' : 'Ascend'}
      </Button>
    </Grid>
  );
};

export default DisplaySettingsSecondRow;
