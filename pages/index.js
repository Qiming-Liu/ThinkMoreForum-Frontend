import React from 'react';
import { Grid, Typography } from '@mui/material';
import Category from '../components/Categroy';
import { getAllCategories } from '../services/Public';

export async function getStaticProps() {
  const { data: categoriesInfo } = await getAllCategories();
  const date = new Date();
  const versionDate = date.toLocaleDateString('en-AU');
  const versionTime = date.toLocaleTimeString('en-AU');

  return {
    props: { categoriesInfo, versionDate, versionTime },
    revalidate: 60,
  };
}

const Index = ({ categoriesInfo, versionDate, versionTime }) => {
  if (!categoriesInfo || categoriesInfo.length === 0) {
    return (
      <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
        No category available now
      </Typography>
    );
  }
  return (
    <Grid container spacing={4}>
      <Typography>{versionDate}</Typography>
      <Typography>{versionTime}</Typography>
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
