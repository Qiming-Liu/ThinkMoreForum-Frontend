import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import Category from '../components/Categroy';
import ThreeColumns from '../components/Layout/three-columns';
import {
  getAllCategories,
  getRandomPost,
  getPostById,
} from '../services/Public';

const CategoriesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export async function getStaticProps() {
  const { data: categoriesInfo } = await getAllCategories();
  const { data: randomPost } = await getRandomPost();
  const pinPostsPromises = categoriesInfo.map(async (categoryInfo) => {
    if (categoryInfo.pinPost) {
      const { data } = await getPostById(categoryInfo.pinPost.id);
      const pinPost = {};
      pinPost.title = data.title;
      pinPost.headImgUrl = data.headImgUrl;
      return pinPost;
    }
    return null;
  });
  const pinPosts = await Promise.all(pinPostsPromises);
  return {
    props: {
      categoriesInfo: categoriesInfo || [],
      randomPost: randomPost || {},
      pinPosts: pinPosts || [],
    },
    revalidate: 60,
  };
}

const Index = ({ categoriesInfo, randomPost, pinPosts }) => {
  if (!categoriesInfo || categoriesInfo.length === 0) {
    return (
      <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
        No category available now
      </Typography>
    );
  }

  return (
    <ThreeColumns randomPost={randomPost}>
      <CategoriesContainer>
        {categoriesInfo.map(
          (
            {
              id,
              color = 'primary.main',
              title,
              description = '',
              postCount = 'N.A.',
              viewCount = 'N.A.',
              participantCount = 'N.A.',
              headImgUrl,
              lastUpdateTimestamp,
            },
            index,
          ) => {
            return (
              <Category
                key={id}
                color={color}
                title={title}
                description={description}
                pinPost={pinPosts[index]}
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
