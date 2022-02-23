import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Divider,
  Pagination,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import PostCard from '../../components/Post/PostCard';
import ArrowLeftIcon from '../../icons/arrow-left';
import {
  getPostsByCategoryTitle,
  getPagesByCategoryTitle,
} from '../../services/usersServices';

const PostList = () => {
  const router = useRouter();
  const { categoryTitle } = router.query;
  const [posts, setPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const sizePerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const { data: responsePosts } = await getPostsByCategoryTitle(
        categoryTitle,
        currentPage,
        sizePerPage,
      );
      const { data: responseTotalPages } = await getPagesByCategoryTitle(
        categoryTitle,
      );
      setTotalPages(Math.ceil(responseTotalPages / sizePerPage));
      setPosts(responsePosts);
    };
    fetchData();
  }, [currentPage, categoryTitle]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };
  if (!posts) return null;
  return (
    <Container maxWidth="md">
      <NextLink href="/" passHref>
        <Button component="a" startIcon={<ArrowLeftIcon fontSize="small" />}>
          Back to Home
        </Button>
      </NextLink>
      <Typography variant="h3" sx={{ mt: 3 }}>
        {categoryTitle}
      </Typography>
      <Divider sx={{ my: 3 }} />
      {posts.map(
        ({
          id,
          createTimestamp,
          postUsers: {
            profileImg: authorAvatar = '/logo.png',
            username: authorName = 'N.A.',
          },
          headImg = 'logo.png',
          context,
          title,
          commentCount,
          viewCount,
          followCount,
        }) => {
          const timeStamp = new Date(createTimestamp);
          const createDate = timeStamp.toLocaleDateString('en-AU');
          const createTime = timeStamp.toLocaleTimeString('en-AU');
          const concatedDateTime = `${createDate.toString()} ${createTime.toString()}`;
          return (
            <PostCard
              key={id}
              generatedUrl={`/post/${id}?categoryTitle=${categoryTitle}`}
              authorAvatar={authorAvatar || '/logo.png'}
              authorName={authorName}
              headImg={headImg || '/logo.png'}
              createTimeStamp={concatedDateTime}
              abstract={context}
              title={title}
              commentCount={commentCount}
              viewCount={viewCount}
              followCount={followCount}
            />
          );
        },
      )}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          mb: 8,
        }}
      >
        <Pagination count={totalPages} onChange={handlePageChange} />
      </Box>
    </Container>
  );
};

export default PostList;
