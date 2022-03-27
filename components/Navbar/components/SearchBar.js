import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import Autocomplete from '@mui/material/Autocomplete';
import { Search } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { Link, InputAdornment } from '@mui/material';
import * as searchService from '../../../services/Post';
import { updatePostViewCount } from '../../../services/Public';

const SearchBar = () => {
  const { isLogin } = useSelector((state) => state.sign);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    console.log(event);
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
        setSearchResults(postByTitleContainingString);
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
      style={{ width: 350, margin: 20 }}
      getOptionLabel={(option) => `${option.title}`}
      inputValue={searchInput}
      onInputChange={handleChange}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        );
      }}
      renderOption={(props, option) => {
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
      }}
    />
  );
};

export default SearchBar;
