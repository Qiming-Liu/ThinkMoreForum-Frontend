import React from 'react';
import { Box, Typography } from '@mui/material';

const CategoryIntro = (props) => {
  const { categoryTitle, description } = props;
  return (
    <Box container spacing={2}>
      <Typography sx={{ mt: 2 }} variant="h4">
        {categoryTitle}
      </Typography>
      <Typography sx={{ mt: 1 }} variant="subtitle2">
        {description}
      </Typography>
    </Box>
  );
};

export default CategoryIntro;
