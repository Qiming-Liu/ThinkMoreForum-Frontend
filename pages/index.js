import React from 'react';
import { Grid, Typography } from '@mui/material';
import Category from '../components/Categroy';
import ThreeColumns from '../components/Layout/three-columns';
import { getAllCategories } from '../services/Public';

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
    <ThreeColumns>
      <Grid container spacing={4}>
        {categoriesInfo.map(
          ({
            id,
            color = 'primary.main',
            title,
            description = '',
            pinPost,
            postCount = 'N.A.',
            viewCount = 'N.A.',
            participantCount = 'N.A.',
            headImgUrl,
            lastUpdateTimestamp,
          }) => {
            return (
              <Category
                key={id}
                color={color}
                title={title}
                description={description}
                pinPost={pinPost}
                postCount={postCount}
                viewCount={viewCount}
                participantCount={participantCount}
                headImgUrl={headImgUrl}
                lastUpdateTimestamp={lastUpdateTimestamp}
              />
            );
          },
        )}
      </Grid>
    </ThreeColumns>
  );
};

export default Index;
