import { Button } from '@mui/material';
// import { Button as MuiButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  min-width: 0;
  margin: 0.5rem;
`;

const ActionButton = (props) => {
  const { children, onClick } = props;
  /* const classes = useStyles(); */
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default ActionButton;
