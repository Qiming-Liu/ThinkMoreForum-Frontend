import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  min-width: 0;
  margin: 0.5rem;
`;

const ActionButton = (props) => {
  const { children, onClick } = props;
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default ActionButton;
