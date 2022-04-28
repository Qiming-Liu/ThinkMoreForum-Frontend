import React, { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';
import { styled } from '@mui/material/styles';
import 'simplebar/dist/simplebar.min.css';

const ScrollbarRoot = styled(SimpleBar)``;

// eslint-disable-next-line react/display-name
const Scrollbar = forwardRef((props, ref: any) => {
  return <ScrollbarRoot ref={ref} {...props} />;
});

export default Scrollbar;
