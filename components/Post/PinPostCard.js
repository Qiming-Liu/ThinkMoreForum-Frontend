/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Chip, Card, Typography } from '@mui/material';

const PinPostCard = (props) => {
  const { title, context, ...other } = props;
  return (
    <Card
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        p: 3,
        pt: 2,
      }}
      {...other}
    >
      <Chip color="secondary" label="PinPost" size="small" />
      <Typography color="inherit" sx={{ mt: 1 }} variant="h4">
        {title}
      </Typography>
      <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
        {context}
      </Typography>
    </Card>
  );
};

export default PinPostCard;
