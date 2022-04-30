import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import NextLink from 'next/link';
import Category from 'components/Categroy';
import ThreeColumns from 'components/Layout/ThreeColumns';
import {
  getAllCategories,
  getRandomPost,
  getPostById,
} from '../services/Public';

interface IndexProps {
  categoriesInfo: Array<any> | never;
  randomPost: any;
  pinPosts: Array<any> | never;
}

const CategoriesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export async function getStaticProps() {
  const { data: categoriesInfo } = await getAllCategories();
  const { data: randomPost } = await getRandomPost();
  const pinPostsPromises = categoriesInfo.map(async (categoryInfo: any) => {
    if (categoryInfo.pinPost) {
      const { data } = await getPostById(categoryInfo.pinPost.id);
      const pinPost = {
        title: data.title,
        headImgUrl: data.headImgUrl,
      };
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
    revalidate: 10,
  };
}

const Index = ({ categoriesInfo, randomPost, pinPosts }: IndexProps) => {
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
              <NextLink href={`/category/${title}`} passHref key={id}>
                <Box sx={{ width: '100%' }}>
                  <Category
                    color={color}
                    title={title}
                    description={description}
                    pinPost={pinPosts[index]}
                    postCount={postCount}
                    viewCount={viewCount}
                    participantCount={participantCount}
                    headImgUrl={headImgUrl}
                    lastUpdateTimestamp={lastUpdateTimestamp}
                    previewMode={false}
                  />
                </Box>
              </NextLink>
            );
          },
        )}
      </CategoriesContainer>
    </ThreeColumns>
  );
};

export default Index;
