import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { Link } from '@mui/material';
import * as searchService from '../../services/Post';
import * as searchUserService from '../../services/Users';
import { updatePostViewCount } from '../../services/Public';

const SearchBar = () => {
  const { isLogin } = useSelector((state) => state.sign);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    if (!event || event.type === 'click') {
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
                  query: { userId: option.id },
                }}
                passHref
              >
                <Link
                  href={{
                    pathname: `/profile/${option.username}`,
                    query: { userId: option.id },
                  }}
                >{`${option.username}`}</Link>
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
                >{`${option.title}`}</Link>
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
