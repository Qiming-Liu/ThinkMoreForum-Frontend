import React from 'react';
import { Grid } from '@mui/material';
import Category from '../components/Categroy';

const Index = () => {
  return (
    <Grid container spacing={4}>
      <Category
        type="A"
        color="primary.main"
        title="Default Category"
        description="description description description"
        postCount="10"
      />
      <Category
        type="B"
        color="neutral.900"
        title="Second Category"
        description="description description description"
        postCount="10"
      />
      <Category
        type="A"
        color="primary.main"
        title="Category Three"
        description="description description description"
        postCount="10"
      />
      <Category
        type="B"
        color="neutral.900"
        title="Category Four"
        description="description description description"
        postCount="10"
      />
    </Grid>
  );
};

export default Index;
