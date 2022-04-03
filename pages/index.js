import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import Category from '../components/Categroy';
import ThreeColumns from '../components/Layout/three-columns';
import { getAllCategories } from '../services/Public';

const CategoriesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export async function getStaticProps() {
  const { data: categoriesInfo } = await getAllCategories();
  return {
    props: { categoriesInfo: categoriesInfo || [] },
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
      <CategoriesContainer>
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
      </CategoriesContainer>
    </ThreeColumns>
  );
};

export default Index;
