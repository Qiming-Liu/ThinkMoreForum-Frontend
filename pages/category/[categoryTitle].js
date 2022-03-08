import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Divider,
  Pagination,
  Typography,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Slide,
  Switch,
  Fab,
  Tooltip,
} from '@mui/material';
import { useRouter } from 'next/router';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import PostCard from '../../components/Post/PostCard';
import ArrowLeftIcon from '../../icons/arrow-left';
import {
  getAllCategories,
  getCategoryByTitle,
  getVisiblePostsByCategoryTitle,
  getVisiblePostCountByCategoryTitle,
  getPostById,
} from '../../services/Public';
import PinPostCard from '../../components/Post/PinPostCard';
import CategoryIntro from '../../components/Categroy/CategoryIntro';
import hotToast from '../../utils/hotToast';
import MyTime from '../../utils/myTime';

const validNumberInput = /[^0-9]/;

const sortColumnList = {
  'View count': 'viewCount',
  'Follow count': 'followCount',
  'Comment count': 'commentCount',
  'Create time': 'createTimestamp',
};

export async function getStaticPaths() {
  const { data: categoriesInfo } = await getAllCategories();
  const paths = categoriesInfo.map((categoryInfo) => ({
    params: { categoryTitle: categoryInfo.title },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  let categoryInfo;

  try {
    ({ data: categoryInfo } = await getCategoryByTitle(params.categoryTitle));
  } catch (error) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const { data: initialTotalCount } = await getVisiblePostCountByCategoryTitle(
    params.categoryTitle,
  );

  let pinPostInfo = null;
  if (categoryInfo.pinPost) {
    const { data } = await getPostById(categoryInfo.pinPost.id);
    if (data.visibility) {
      pinPostInfo = data;
    }
  }

  return {
    props: { categoryInfo, initialTotalCount, pinPostInfo },
    revalidate: 1,
  };
}

const PostList = ({ categoryInfo, initialTotalCount, pinPostInfo }) => {
  const { title: categoryTitle, description } = categoryInfo;
  let initialPinPostDisplay;
  let initialHeadImgDisplay;
  let initialSortColumn;
  let initialSortDirection;
  let initialSizePerPage;
  let initialPage;
  let initialDisplayAbstract;

  try {
    initialPinPostDisplay =
      localStorage.getItem(`pinPost display`) === true || true;
    initialHeadImgDisplay =
      localStorage.getItem(`postHeadIgmDisplay`) === true || true;
    initialSortColumn =
      localStorage.getItem(`sortColumn`) === true || 'Create time';
    initialSortDirection =
      localStorage.getItem(`sortDirection`) === true || true;
    initialSizePerPage =
      parseInt(localStorage.getItem(`sizePerPage`), 10) || 10;
    initialPage =
      parseInt(sessionStorage.getItem(`${categoryTitle}_currentPage`), 10) || 0;
    initialDisplayAbstract =
      localStorage.getItem(`postAbstractDisplay`) === true || true;
  } catch (error) {
    initialPinPostDisplay = true;
    initialHeadImgDisplay = true;
    initialSortColumn = 'Create time';
    initialSortDirection = true;
    initialSizePerPage = 10;
    initialPage = 0;
    initialDisplayAbstract = true;
  }

  const router = useRouter();
  const [posts, setPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  let inputCurrentPage = currentPage;
  const [sizePerPage, setSizePerPage] = useState(initialSizePerPage);
  let inputSizePerPage = initialSizePerPage;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialTotalCount / initialSizePerPage),
  );
  const [displayPinPost, setDisplayPinPost] = useState(initialPinPostDisplay);
  const [displayHeadImg, setDisplayHeadImg] = useState(initialHeadImgDisplay);
  const [displayAbstract, setDisplayAbstract] = useState(
    initialDisplayAbstract,
  );
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);

  useEffect(() => {
    const sortParams = `${sortColumnList[sortColumn]},${
      sortDirection ? 'desc' : 'asc'
    }`;
    const fetchPageData = async () => {
      const { data: responsePosts } = await getVisiblePostsByCategoryTitle(
        categoryTitle,
        currentPage,
        sizePerPage,
        sortParams,
      );
      const { data: responseTotalCount } =
        await getVisiblePostCountByCategoryTitle(categoryTitle);
      setTotalPages(Math.ceil(responseTotalCount / sizePerPage));
      setPosts(responsePosts);
    };
    fetchPageData();
  }, [
    categoryTitle,
    currentPage,
    sizePerPage,
    totalPages,
    sortColumn,
    sortDirection,
  ]);

  if (router.isFallback)
    return (
      <Typography variant="h3" sx={{ mt: 3 }}>
        Loading...
      </Typography>
    );

  const handlePageChange = (event, page) => {
    sessionStorage.setItem(`${categoryTitle}_currentPage`, page - 1);
    setCurrentPage(page - 1);
  };

  const togglePinPostDisplay = () => {
    localStorage.setItem(`pinPost display`, !displayPinPost);
    setDisplayPinPost(!displayPinPost);
  };

  const toggleHeadImgDisplay = () => {
    localStorage.setItem(`postHeadIgmDisplay`, !displayHeadImg);
    setDisplayHeadImg(!displayHeadImg);
  };

  const toggleAbstractDisplay = () => {
    localStorage.setItem(`postAbstractDisplay`, !displayAbstract);
    setDisplayAbstract(!displayAbstract);
  };

  const toggleSortDirection = () => {
    localStorage.setItem(`sortDirection`, !sortDirection);
    setSortDirection(!sortDirection);
  };

  const handleSortColumn = (event) => {
    localStorage.setItem(`sortColumn`, event.target.value);
    setSortColumn(event.target.value);
  };

  const handleSizePerPage = () => {
    if (validNumberInput.test(inputSizePerPage) || !inputSizePerPage) {
      hotToast('error', 'Invalid input');
    } else if (inputSizePerPage > 20 || inputSizePerPage < 1) {
      hotToast('error', 'Please use a number between 1 and 20');
    } else {
      localStorage.setItem(`sizePerPage`, inputSizePerPage);
      sessionStorage.setItem(`${categoryTitle}_currentPage`, 0);
      setCurrentPage(0);
      setSizePerPage(inputSizePerPage);
    }
  };

  const handleCurrentPage = () => {
    if (validNumberInput.test(inputCurrentPage) || !inputCurrentPage) {
      hotToast('error', 'Invalid input');
    } else if (inputCurrentPage > totalPages || inputCurrentPage < 1) {
      hotToast('error', `Please use a number between 1 and ${totalPages}`);
    } else {
      sessionStorage.setItem(
        `${categoryTitle}_currentPage`,
        inputCurrentPage - 1,
      );
      setCurrentPage(inputCurrentPage - 1);
    }
  };

  const handleInputSizePerPage = (event) => {
    inputSizePerPage = event.target.value;
  };

  const handleInputCurrentPage = (event) => {
    inputCurrentPage = event.target.value;
  };

  return (
    <Container maxWidth="xl">
      <NextLink href="/" passHref>
        <Button component="a" startIcon={<ArrowLeftIcon fontSize="small" />}>
          Back to Home
        </Button>
      </NextLink>
      <CategoryIntro categoryTitle={categoryTitle} description={description} />
      <Divider sx={{ mt: 3, mb: 1 }} />
      {pinPostInfo && (
        <Box sx={{ display: displayPinPost ? undefined : 'none' }}>
          <PinPostCard
            title={pinPostInfo.title}
            context={pinPostInfo.context}
          />
          <Divider sx={{ my: 1 }} />
        </Box>
      )}
      <Grid container spacing={1} align="center">
        <Grid item xs={2} justifyContent="center" sx={{ mt: 0.7 }}>
          <Typography variant="h6" align="center">
            Display setting:
          </Typography>
        </Grid>
        <Grid item>
          <FormGroup row>
            <FormControlLabel
              checked={displayPinPost}
              control={<Switch color="primary" />}
              label="PinPost"
              labelPlacement="end"
              onChange={togglePinPostDisplay}
              sx={{ display: !pinPostInfo ? 'none' : undefined }}
            />
            <FormControlLabel
              checked={displayHeadImg}
              control={<Switch color="primary" />}
              label="Cover"
              labelPlacement="end"
              onChange={toggleHeadImgDisplay}
            />
            <FormControlLabel
              checked={displayAbstract}
              control={<Switch color="primary" />}
              label="Abstract"
              labelPlacement="end"
              onChange={toggleAbstractDisplay}
            />
          </FormGroup>
        </Grid>
        <Grid item>
          <TextField
            placeholder="1-20"
            size="small"
            id="outlined-basic"
            label="Posts/page"
            variant="outlined"
            type="number"
            defaultValue={sizePerPage}
            onChange={handleInputSizePerPage}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSizePerPage}
                    size="small"
                    color="primary"
                  >
                    <CheckIcon />
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: {
                max: 20,
                min: 1,
              },
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            sx={{ ml: 1 }}
            id="outlined-basic"
            label="Sorted by"
            variant="outlined"
            select
            value={sortColumn}
            onChange={handleSortColumn}
          >
            {Object.keys(sortColumnList).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={toggleSortDirection}
            sx={{ mt: 0.2, ml: 1 }}
            endIcon={
              sortDirection ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
            }
          >
            {sortDirection ? 'Descend' : 'Ascend'}
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1, mb: 4 }} />
      {!posts ? (
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
            headImgUrl,
            context,
            title,
            commentCount,
            viewCount,
            followCount,
          }) => {
            const concatedDateTime = MyTime(createTimestamp);
            let headImgUrl;
            if (headImg) {
              headImgUrl = headImg.url;
            }
            return (
              <PostCard
                key={id}
                id={id}
                generatedUrl={`/post/${id}`}
                authorAvatar={authorAvatar || '/logo.png'}
                authorName={authorName}
                headImg={displayHeadImg && (headImgUrl || '/logo.png')}
                createTimeStamp={concatedDateTime}
                abstract={displayAbstract && context}
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
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage + 1}
          onChange={handlePageChange}
        />
        <Typography sx={{ mr: 1 }}>Go To Page</Typography>
        <TextField
          placeholder={`1-${totalPages}`}
          size="small"
          id="outlined-basic"
          label="Number"
          variant="outlined"
          type="number"
          onChange={handleInputCurrentPage}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ margin: 0 }}>
                <IconButton
                  onClick={handleCurrentPage}
                  size="small"
                  color="primary"
                >
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            ),
            inputProps: {
              max: totalPages,
              min: 1,
            },
          }}
        />
      </Box>
      <Tooltip
        title="Make a post"
        placement="top"
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(3),
          right: (theme) => theme.spacing(10),
        }}
      >
        <Slide
          direction="left"
          in
          style={{ transitionDelay: '1000ms' }}
          mountOnEnter
          unmountOnExit
        >
          <Fab
            size="medium"
            color="primary"
            aria-label="add"
            onClick={() =>
              router.push({
                pathname: '/post/make-post',
                query: {
                  categoryTitle: categoryInfo.title,
                },
              })
            }
          >
            <AddIcon />
          </Fab>
        </Slide>
      </Tooltip>
    </Container>
  );
};

export default PostList;
