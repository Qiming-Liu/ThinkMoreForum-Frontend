/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
import axios from 'axios';
import { useRouter } from 'next/router';
import PostCard from '../../../components/Post/PostCard';
import ArrowLeftIcon from '../../../icons/arrow-left';
import {
  getPostsByCategoryTitle,
  getPagesByCategoryTitle,
} from '../../../services/usersServices';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/v1/category',
//   timeout: 2000,
//   headers: {
//     Authorization:
//       'eyJhbGciOiJIUzM4NCJ9.eyJqdGkiOiJhNWUxMzUxMC05MmU0LTExZWMtYWRlYy0yNzQzNTk0NDVhYWQiLCJzdWIiOiJhZG1pbiIsImF1ZCI6Int9IiwiaWF0IjoxNjQ1NDk3NjY3LCJleHAiOjE2NDU1MzQ4MDB9.9XyLuCtU0vyL9dM2E2vOg99L9lZytizdLRfhMqptBKLjtCSbertMYdfNDWmpBJxz',
//   },
// });

const PostList = () => {
  const router = useRouter();
  const { categoryTitle } = router.query;
  const [posts, setPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const sizePerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const responsePosts = await getPostsByCategoryTitle(
        categoryTitle,
        currentPage,
        sizePerPage,
      );
      const responseTotalPages = await getPagesByCategoryTitle(categoryTitle);
      setTotalPages(Math.ceil(responseTotalPages.data / sizePerPage));
      setPosts(responsePosts.data);
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
      {posts.map((post) => {
        const timeStamp = new Date(post.createTimestamp);
        const createDate = timeStamp.toLocaleDateString('en-AU');
        const createTime = timeStamp.toLocaleTimeString('en-AU');
        const concatedDateTime = `${createDate.toString()} ${createTime.toString()}`;
        return (
          <PostCard
            key={post.id}
            generatedUrl={`/category/${categoryTitle}/post/${post.id}`}
            authorAvatar={
              post.postUsers.profileImg
                ? post.postUsers.profileImg.url
                : '/logo.png'
            }
            authorName={post.postUsers.username}
            headImg={post.headImg ? post.headImg.url : '/logo.png'}
            createTimeStamp={concatedDateTime}
            abstract={post.context}
            title={post.title}
            commentCount={post.commentCount}
            viewCount={post.viewCount}
            followCount={post.followCount}
          />
        );
      })}
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
