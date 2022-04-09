import React from 'react';
import { Box, Typography } from '@mui/material';

interface CategoryIntroProps {
  categoryTitle: string;
  description: string;
}

const CategoryIntro = ({ categoryTitle, description }: CategoryIntroProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" style={{ fontSize: '34px' }}>
        {categoryTitle}
      </Typography>
      <Typography sx={{ mt: 2 }} variant="subtitle2">
        {description}
      </Typography>
    </Box>
  );
};

export default CategoryIntro;
