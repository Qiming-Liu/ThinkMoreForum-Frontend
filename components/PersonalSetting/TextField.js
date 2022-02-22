import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const TextField = ({ title }) => {
  const [name, setName] = useState('Composed TextField');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <InputLabel htmlFor="component-outlined">{title}</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={name}
          onChange={handleChange}
          label="Name"
        />
      </FormControl>
    </Box>
  );
};

export default TextField;
