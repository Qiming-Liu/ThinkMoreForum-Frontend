import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import Autocomplete from '@mui/material/Autocomplete';
import DescriptionIcon from '@mui/icons-material/Description';
import { useSelector } from 'react-redux';
import { Link } from '@mui/material';
import Image from 'next/image';
import * as searchService from '../../services/Post';
import * as searchUserService from '../../services/Users';
import { updatePostViewCount } from '../../services/Public';

const SearchBar = () => {
  const { isLogin } = useSelector((state) => state.sign);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    if (!event || event.type === 'click') {
      setSearchResults([]);
      setSearchInput('');
    } else if (event.target) {
      const searchData = event.target.value;
      if (!searchData) {
        setSearchInput('');
      } else setSearchInput(searchData);
    }
  };

  useEffect(() => {
    if (isLogin && searchInput && searchInput.length > 0) {
      const getResults = async () => {
        const { data: postByTitleContainingString } =
          await searchService.getPostByTitleContainingString(searchInput);
        const { data: getUserByContainingString } =
          await searchUserService.getUserByContainingString(searchInput);
        const userAndPost = postByTitleContainingString.concat(
          getUserByContainingString,
        );
        setSearchResults(userAndPost);
      };
      getResults();
    }
  }, [isLogin, searchInput]);

  const handleClick = (id) => {
    updatePostViewCount(id);
  };

  return (
    <Autocomplete
      id="custom-autocomplete"
      freeSolo
      options={searchResults}
      style={{ margin: 5 }}
      getOptionLabel={(option) => {
        if (option.title !== undefined) {
          return `${option.title}`;
        }
        if (option.username !== undefined) {
          return `${option.username}`;
        }
        return option;
      }}
      inputValue={searchInput}
      onInputChange={handleChange}
      renderInput={(params) => {
        return <TextField {...params} variant="outlined" label="Search" />;
      }}
      renderOption={(props, option) => {
        if (option.username !== undefined) {
          return (
            <li {...props}>
              <NextLink
                href={{
                  pathname: `/profile/${option.username}`,
                }}
                passHref
              >
                <Link
                  href={{
                    pathname: `/profile/${option.username}`,
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    textDecoration: 'none',
                    fontSize: 14,
                  }}
                >
                  <Image
                    src={option.headImgUrl}
                    alt="Profile"
                    width="25px"
                    height="25px"
                    style={{
                      borderRadius: '50%',
                    }}
                  />
                  {`${option.username}`}
                </Link>
              </NextLink>
            </li>
          );
        }
        if (option.title !== undefined) {
          return (
            <li {...props}>
              <NextLink
                href={`/post/${option.id}`}
                onClick={() => handleClick(option.id)}
                passHref
              >
                <Link
                  href={`/post/${option.id}`}
                  onClick={() => handleClick(option.id)}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <DescriptionIcon />
                  {`${option.title}`}
                </Link>
              </NextLink>
            </li>
          );
        }
        return null;
      }}
    />
  );
};

export default SearchBar;
