import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from '@material-ui/core';

const Checkbox = (props) => {
  const { name, value, onChange, label } = props;

  const convertToDefaultParams = () => ({
    target: {
      name,
      value,
    },
  });
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefaultParams(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default Checkbox;
