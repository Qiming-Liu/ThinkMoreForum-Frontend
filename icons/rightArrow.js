import * as React from 'react';
import { createSvgIcon } from '@mui/material/utils';

const RightArrow = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fillRule="evenodd"
    clipRule="evenodd"
  >
    <path d="M21.883 12l-7.527 6.235L15 19l9-7.521L15 4l-.645.764L21.884 11H0v1h21.883z" />
  </svg>,
  'RightArrow',
);

export default RightArrow;
