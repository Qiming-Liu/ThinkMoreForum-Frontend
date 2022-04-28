import React, { useState, useEffect, useCallback, useMemo } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import CheckIcon from '@mui/icons-material/Check';
import Head from 'next/head';
import useSWR from 'swr';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  getCategoryByTitle,
  getPostById,
  getVisiblePostCountByCategoryId,
} from '../../services/Public';
import hotToast from '../../utils/hotToast';
import getInitialDisplaySettings from '../../utils/getInitialDisplaySettings';
import CategoryIntro from '../../components/Categroy/CategoryIntro';
import Loading from '../../components/Loading';
import Posts from '../../components/Post/Posts';
import CommonContainer from '../../components/Layout/CommonContainer';
import DisplaySettings from '../../components/Categroy/CategoryPageComponents/DisplaySettings';
import DisplaySettingsSecondRow from '../../components/Categroy/CategoryPageComponents/DisplaySettingsSecondRow';
import PinPostCard from '../../components/Post/PinPostCard';
import MakePostButton from '../../components/Categroy/CategoryPageComponents/MakePostButton';

const validNumberInput = /[^0-9]/;

const sortColumnList: { [key: string]: string } = {
  'View count': 'viewCount',
  'Follow count': 'followCount',
  'Comment count': 'commentCount',
  'Create time': 'createTimestamp',
};

const getCategoryByTitleSWR = async (categoryTitle: string | never) => {
  const { data } = await getCategoryByTitle(categoryTitle);
  return data;
};

const getPostByIdSWR = async (pinPostId: string | never) => {
  const { data } = await getPostById(pinPostId);
  return data;
};

const getTotalPostsCountSWR = async (categoryId: string | never) => {
  const { data } = await getVisiblePostCountByCategoryId(categoryId);
  return data;
};

const PostList = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
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

  const {
    initialHeadImgDisplay,
    initialSortColumn,
    initialSortDirection,
    initialSizePerPage,
    initialPage,
    initialDisplayAbstract,
  } = getInitialDisplaySettings(categoryTitle);

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
    localStorage.setItem(`postHeadIgmDisplay`, JSON.stringify(!displayHeadImg));
    setDisplayHeadImg(!displayHeadImg);
  }, [displayHeadImg]);

  const toggleAbstractDisplay = useCallback(() => {
    localStorage.setItem(
      `postAbstractDisplay`,
      JSON.stringify(!displayAbstract),
    );
    setDisplayAbstract(!displayAbstract);
  }, [displayAbstract]);

  const toggleSortDirection = useCallback(() => {
    localStorage.setItem(`sortDirection`, JSON.stringify(!sortDirection));
    setSortDirection(!sortDirection);
  }, [sortDirection]);

  const handlePageChange = useCallback(
    (event: any, page: any) => {
      sessionStorage.setItem(
        `${categoryTitle}_currentPage`,
        JSON.stringify(page - 1),
      );
      setCurrentPage(page - 1);
    },
    [categoryTitle],
  );

  const handleSortColumn = useCallback((event: any) => {
    localStorage.setItem(`sortColumn`, event.target.value);
    setSortColumn(event.target.value);
  }, []);

  const showPinPost = useMemo(() => {
    return pinPost && currentPage === 0;
  }, [currentPage, pinPost]);

  const handleSizePerPage = useCallback(() => {
    if (
      validNumberInput.test(inputSizePerPage.toString()) ||
      !inputSizePerPage
    ) {
      hotToast('error', 'Invalid input');
    } else if (inputSizePerPage > 20 || inputSizePerPage < 1) {
      hotToast('error', 'Please use a number between 1 and 20');
    } else {
      localStorage.setItem(`sizePerPage`, JSON.stringify(inputSizePerPage));
      sessionStorage.setItem(`${categoryTitle}_currentPage`, '0');
      setCurrentPage(0);
      setSizePerPage(inputSizePerPage);
    }
  }, [categoryTitle, inputSizePerPage]);

  const handleCurrentPage = useCallback(() => {
    if (
      validNumberInput.test(inputCurrentPage.toString()) ||
      !inputCurrentPage
    ) {
      hotToast('error', 'Invalid input');
    } else if (inputCurrentPage > totalPages || inputCurrentPage < 1) {
      hotToast('error', `Please use a number between 1 and ${totalPages}`);
    } else {
      sessionStorage.setItem(
        `${categoryTitle}_currentPage`,
        `${inputCurrentPage - 1}`,
      );
      setCurrentPage(inputCurrentPage - 1);
    }
  }, [categoryTitle, inputCurrentPage, totalPages]);

  const handleInputSizePerPage = useCallback((event: any) => {
    setInputSizePerPage(event.target.value);
  }, []);

  const handleInputCurrentPage = useCallback((event: any) => {
    setInputCurrentPage(event.target.value);
  }, []);

  useEffect(() => {
    setSortParams(
      `${sortColumnList[sortColumn]},${sortDirection ? 'desc' : 'asc'}`,
    );
  }, [sortColumn, sortDirection]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / sizePerPage));
  }, [sizePerPage, totalCount]);

  if (thisCategoryError || pinPostError || totalCountError) router.push(`/404`);
  if (!thisCategory) return <Loading />;

  return (
    <CommonContainer>
      <Head>
        <title>{categoryTitle} | ThinkMore Forum</title>
      </Head>
      <NextLink href="/" passHref>
        <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
          Back to Home
        </Button>
      </NextLink>
      <Divider sx={{ my: 1.5 }} />
      <CategoryIntro
        categoryTitle={categoryTitle}
        description={thisCategory.description}
      />
      <Grid
        container
        spacing={1}
        alignItems="center"
        sx={{
          borderTop: 2,
          borderBottom: 2,
          borderColor: 'grey.200',
          pb: 1,
          mt: 2.5,
          mb: 3,
        }}
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <DisplaySettings
          displayHeadImg={displayHeadImg}
          toggleHeadImgDisplay={toggleHeadImgDisplay}
          displayAbstract={displayAbstract}
          toggleAbstractDisplay={toggleAbstractDisplay}
        />
        <DisplaySettingsSecondRow
          sizePerPage={sizePerPage}
          handleSizePerPage={handleSizePerPage}
          handleInputSizePerPage={handleInputSizePerPage}
          sortColumn={sortColumn}
          sortColumnList={sortColumnList}
          handleSortColumn={handleSortColumn}
          toggleSortDirection={toggleSortDirection}
          sortDirection={sortDirection}
        />
      </Grid>
      {showPinPost && (
        <PinPostCard
          pinPostInfo={pinPost}
          displayHeadImg={displayHeadImg}
          displayAbstract={displayAbstract}
        />
      )}
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
          showPinPost={showPinPost && pinPost.id}
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
      <MakePostButton
        categoryTitle={categoryTitle}
        mobileDevice={mobileDevice}
      />
    </CommonContainer>
  );
};

export default PostList;
