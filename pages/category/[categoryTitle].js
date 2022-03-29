import React, { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
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
import { useSelector, useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import Head from 'next/head';
import useSWR from 'swr';
import { openSignDialog } from '../../store/actions/signAction';
import ArrowLeftIcon from '../../icons/arrow-left';
import {
  getCategoryByTitle,
  getPostById,
  getVisiblePostCountByCategoryId,
} from '../../services/Public';
import PinPostCard from '../../components/Post/PinPostCard';
import CategoryIntro from '../../components/Categroy/CategoryIntro';
import hotToast from '../../utils/hotToast';
import Loading from '../../components/Loading/Loading';
import Posts from '../../components/Post/Posts';
import CommonContainer from '../../components/Layout/common-container';
import checkPermission from '../../utils/checkPermission';

const validNumberInput = /[^0-9]/;

const sortColumnList = {
  'View count': 'viewCount',
  'Follow count': 'followCount',
  'Comment count': 'commentCount',
  'Create time': 'createTimestamp',
};

const getCategoryByTitleSWR = async (categoryTitle) => {
  const { data } = await getCategoryByTitle(categoryTitle);
  return data;
};

const getPostByIdSWR = async (pinPostId) => {
  const { data } = await getPostById(pinPostId);
  return data;
};

const getTotalPostsCountSWR = async (categoryId) => {
  const { data } = await getVisiblePostCountByCategoryId(categoryId);
  return data;
};

const PostList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categoryTitle } = router.query;
  const { data: thisCategory, error: thisCategoryError } = useSWR(
    categoryTitle,
    getCategoryByTitleSWR,
  );
  const { data: pinPost, error: pinPostError } = useSWR(
    () => thisCategory.pinPost.id,
    getPostByIdSWR,
  );
  const { data: totalCount, error: totalCountError } = useSWR(
    () => thisCategory.id,
    getTotalPostsCountSWR,
  );

  const { isLogin, myDetail } = useSelector((state) => state.sign);

  let initialHeadImgDisplay;
  let initialSortColumn;
  let initialSortDirection;
  let initialSizePerPage;
  let initialPage;
  let initialDisplayAbstract;

  try {
    initialHeadImgDisplay = JSON.parse(
      localStorage.getItem(`postHeadIgmDisplay`),
    );
    if (initialHeadImgDisplay === null) initialHeadImgDisplay = true;
  } catch (e) {
    initialHeadImgDisplay = true;
  }

  try {
    initialSortColumn = localStorage.getItem(`sortColumn`);
    if (initialSortColumn === null) initialSortColumn = 'Create time';
  } catch (e) {
    initialSortColumn = 'Create time';
  }

  try {
    initialSortDirection = JSON.parse(localStorage.getItem(`sortDirection`));
    if (initialSortDirection === null) initialSortDirection = true;
  } catch (e) {
    initialSortDirection = true;
  }

  try {
    initialSizePerPage =
      parseInt(localStorage.getItem(`sizePerPage`), 10) || 10;
  } catch (e) {
    initialSizePerPage = 10;
  }

  try {
    initialPage =
      parseInt(sessionStorage.getItem(`${categoryTitle}_currentPage`), 10) || 0;
    if (initialPage === null) initialPage = 0;
  } catch (e) {
    initialPage = 0;
  }

  try {
    initialDisplayAbstract = JSON.parse(
      localStorage.getItem(`postAbstractDisplay`),
    );
    if (initialDisplayAbstract === null) initialDisplayAbstract = true;
  } catch (e) {
    initialDisplayAbstract = true;
  }

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [inputCurrentPage, setInputCurrentPage] = useState(currentPage);
  const [sizePerPage, setSizePerPage] = useState(initialSizePerPage);
  const [inputSizePerPage, setInputSizePerPage] = useState(initialSizePerPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalCount / initialSizePerPage),
  );
  const [displayHeadImg, setDisplayHeadImg] = useState(initialHeadImgDisplay);
  const [displayAbstract, setDisplayAbstract] = useState(
    initialDisplayAbstract,
  );
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [sortParams, setSortParams] = useState(
    `${sortColumnList[sortColumn]},${sortDirection ? 'desc' : 'asc'}`,
  );

  const toggleHeadImgDisplay = useCallback(() => {
    localStorage.setItem(`postHeadIgmDisplay`, !displayHeadImg);
    setDisplayHeadImg(!displayHeadImg);
  }, [displayHeadImg]);

  const toggleAbstractDisplay = useCallback(() => {
    localStorage.setItem(`postAbstractDisplay`, !displayAbstract);
    setDisplayAbstract(!displayAbstract);
  }, [displayAbstract]);

  const toggleSortDirection = useCallback(() => {
    localStorage.setItem(`sortDirection`, !sortDirection);
    setSortDirection(!sortDirection);
  }, [sortDirection]);

  const handlePageChange = useCallback(
    (event, page) => {
      sessionStorage.setItem(`${categoryTitle}_currentPage`, page - 1);
      setCurrentPage(page - 1);
    },
    [categoryTitle],
  );

  const handleSortColumn = useCallback((event) => {
    localStorage.setItem(`sortColumn`, event.target.value);
    setSortColumn(event.target.value);
  }, []);

  const handleSizePerPage = useCallback(() => {
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
  }, [categoryTitle, inputSizePerPage]);

  const handleCurrentPage = useCallback(() => {
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
  }, [categoryTitle, inputCurrentPage, totalPages]);

  const handleInputSizePerPage = useCallback((event) => {
    setInputSizePerPage(event.target.value);
  }, []);

  const handleInputCurrentPage = useCallback((event) => {
    setInputCurrentPage(event.target.value);
  }, []);
  const permissionCheck = useCallback(() => {
    return checkPermission('makePost', myDetail.role)
      ? router.push({
          pathname: '/post/make-post',
          query: {
            categoryTitle,
          },
        })
      : hotToast('error', 'You do not have permission to make post!');
  }, [categoryTitle, myDetail, router]);

  const handleMakeNewPost = useCallback(() => {
    return isLogin ? permissionCheck() : dispatch(openSignDialog());
  }, [dispatch, isLogin, permissionCheck]);

  useEffect(() => {
    setSortParams(
      `${sortColumnList[sortColumn]},${sortDirection ? 'desc' : 'asc'}`,
    );
  }, [sortColumn, sortDirection]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / sizePerPage));
  }, [sizePerPage, totalCount]);

  if (router.isFallback) return <Loading />;
  if (thisCategoryError || pinPostError || totalCountError) router.push(`/404`);
  if (!thisCategory) return <Loading />;

  return (
    <CommonContainer>
      <Head>
        <title>{categoryTitle} | ThinkMoreForum</title>
      </Head>
      <NextLink href="/" passHref>
        <Button component="a" startIcon={<ArrowLeftIcon fontSize="small" />}>
          Back to Home
        </Button>
      </NextLink>
      <CategoryIntro
        categoryTitle={categoryTitle}
        description={thisCategory.description}
      />
      <Divider sx={{ mt: 3, mb: 2 }} />
      {pinPost && (
        <Box>
          <PinPostCard
            title={pinPost.title}
            context={pinPost.context}
            id={pinPost.id}
          />
          <Divider sx={{ my: 1 }} />
        </Box>
      )}
      <Grid
        container
        spacing={1}
        align="center"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <Grid
          item
          alignItems="center"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
          zeroMinWidth
        >
          <Typography variant="h6" align="center" sx={{ mr: 2 }} noWrap>
            Display setting:
          </Typography>
          <FormGroup
            row
            style={{ display: 'flex', flexWrap: 'nowrap', overflow: 'hidden' }}
          >
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
        <Grid
          item
          xs
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
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
      <Divider sx={{ mt: 2, mb: 2 }} />
      {thisCategory.postCount === 0 ? (
        <Typography variant="body1">No post in this category.</Typography>
      ) : (
        <Posts
          categoryId={thisCategory.id}
          currentPage={currentPage}
          sizePerPage={sizePerPage}
          sortParams={sortParams}
          displayHeadImg={displayHeadImg}
          displayAbstract={displayAbstract}
        />
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
          label="Page"
          type="number"
          defaultValue={1}
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
            onClick={() => handleMakeNewPost()}
          >
            <AddIcon />
          </Fab>
        </Slide>
      </Tooltip>
    </CommonContainer>
  );
};

export default PostList;
