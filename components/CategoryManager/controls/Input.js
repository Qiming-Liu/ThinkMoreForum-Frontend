import React from 'react';
import { TextField } from '@material-ui/core';

const input = (props) => {
  const { name, value, onChange, label, error = null, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default input;
