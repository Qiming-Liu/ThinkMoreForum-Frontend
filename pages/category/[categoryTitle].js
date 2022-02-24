import React, { useState, useRef, useEffect } from 'react';
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
  getAllCategoryTitles,
  getPostsByCategoryTitle,
  getPostCountByCategoryTitle,
  getCategoryByCategoryTitle,
} from '../../services/usersServices';

const initialPage = 0;
const initialSizePerPage = 10;

export const useComponentDidMount = () => {
  const ref = useRef();
  useEffect(() => {
    ref.current = true;
  }, []);
  return ref.current;
};

export async function getStaticPaths() {
  const { data: categoriesInfo } = await getAllCategoryTitles();
  const paths = categoriesInfo.map((categoryInfo) => ({
    params: { categoryTitle: categoryInfo.title },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    await getCategoryByCategoryTitle(params.categoryTitle);
  } catch (error) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  const { data: initialPosts } = await getPostsByCategoryTitle(
    params.categoryTitle,
    initialPage,
    initialSizePerPage,
  );
  const { data: initialTotalCount } = await getPostCountByCategoryTitle(
    params.categoryTitle,
  );
  const initialTotalPages = Math.ceil(initialTotalCount / initialSizePerPage);
  const { categoryTitle } = params;
  return {
    props: { categoryTitle, initialPosts, initialTotalPages },
    revalidate: 1,
  };
}

const PostList = ({ categoryTitle, initialPosts, initialTotalPages }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const sizePerPage = initialSizePerPage;
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const isComponentMounted = useComponentDidMount();
  useEffect(() => {
    if (isComponentMounted) {
      const fetchPageData = async () => {
        const { data: responsePosts } = await getPostsByCategoryTitle(
          categoryTitle,
          currentPage,
          sizePerPage,
        );
        const { data: responseTotalPages } = await getPostCountByCategoryTitle(
          categoryTitle,
        );
        setTotalPages(Math.ceil(responseTotalPages / sizePerPage));
        setPosts(responsePosts);
      };
      fetchPageData();
    }
  }, [categoryTitle, currentPage, isComponentMounted, sizePerPage, totalPages]);
  if (router.isFallback)
    return (
      <Typography variant="h3" sx={{ mt: 3 }}>
        Loading...
      </Typography>
    );

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };
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
      {Object.keys(posts).length === 0 ? (
        <Typography variant="body1">No post in this category.</Typography>
      ) : (
        posts.map(
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
        )
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
