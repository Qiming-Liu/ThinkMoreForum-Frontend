import React from 'react';
import { Grid, Typography } from '@mui/material';
import Category from '../components/Categroy';
import { getAllCategories } from '../services/usersServices';

export async function getStaticProps() {
  const { data: categoriesInfo } = await getAllCategories();
  return {
    props: { categoriesInfo },
    revalidate: 60,
  };
}

const Index = ({ categoriesInfo }) => {
  if (!categoriesInfo || categoriesInfo.length === 0) {
    return (
      <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
        No category available now
      </Typography>
    );
  }
  return (
    <Grid container spacing={4}>
      {categoriesInfo.map(
        ({
          id,
          type = 0,
          color = 'primary.main',
          title,
          description = '',
          postCount = 'N.A.',
        }) => {
          return (
            <Category
              key={id}
              type={type}
              color={color}
              title={title}
              description={description}
              postCount={postCount}
            />
          );
        },
      )}
    </Grid>
  );
};

export default Index;
