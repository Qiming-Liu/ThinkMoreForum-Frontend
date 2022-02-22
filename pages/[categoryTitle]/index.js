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
import PostCard from '../../components/Post/PostCard';
import ArrowLeftIcon from '../../icons/arrow-left';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/v1/category',
  timeout: 2000,
  headers: {
    Authorization:
      'eyJhbGciOiJIUzM4NCJ9.eyJqdGkiOiJhNWUxMzUxMC05MmU0LTExZWMtYWRlYy0yNzQzNTk0NDVhYWQiLCJzdWIiOiJhZG1pbiIsImF1ZCI6Int9IiwiaWF0IjoxNjQ1NDk3NjY3LCJleHAiOjE2NDU1MzQ4MDB9.9XyLuCtU0vyL9dM2E2vOg99L9lZytizdLRfhMqptBKLjtCSbertMYdfNDWmpBJxz',
  },
});

const PostList = () => {
  const router = useRouter();
  const { categoryTitle } = router.query;
  const [posts, setPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const sizePerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const responsePosts = await axiosInstance
        .get(`/${categoryTitle}`, {
          params: {
            page: currentPage,
            value: sizePerPage,
          },
        })
        .then((res) => {
          // handle success
          return res.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      const responseTotalPages = await axiosInstance
        .get('/Second Category/count')
        .then((res) => {
          // handle success
          return Math.ceil(res.data / sizePerPage);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setTotalPages(responseTotalPages);
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
      {posts.map((post) => {
        const timeStamp = new Date(post.createTimestamp);
        const createDate = timeStamp.toLocaleDateString('en-AU');
        const createTime = timeStamp.toLocaleTimeString('en-AU');
        const concatedDateTime = `${createDate.toString()} ${createTime.toString()}`;
        return (
          <PostCard
            authorAvatar="/logo.png"
            authorName={post.postUsers.username}
            headImg="/logo.png"
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
