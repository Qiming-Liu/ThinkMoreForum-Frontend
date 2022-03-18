import React from 'react';
import { Button as MButton } from '@mui/material';
import styled from 'styled-components';

const StyledMButton = styled(MButton)`
  margin: 10px;
  label: {
    text-transform: none;
  }
`;

const Button = (props) => {
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <StyledMButton
      variant={variant || 'contained'}
      size={size || 'large'}
      onClick={onClick}
      {...other}
    >
      {text}
    </StyledMButton>
  );
};

export default Button;
