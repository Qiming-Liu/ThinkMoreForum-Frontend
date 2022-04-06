import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import DescriptionIcon from '@mui/icons-material/Description';
import { useSelector, useDispatch } from 'react-redux';
import { InputAdornment } from '@mui/material';
import * as searchService from '../../services/Post';
import * as searchUserService from '../../services/Users';
import { updatePostViewCount } from '../../services/Public';
import { openSignDialog } from '../../store/actions/signAction';

const SearchBar = () => {
  const { isLogin } = useSelector((state) => state.sign);
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    if (!isLogin) {
      dispatch(openSignDialog());
      return;
    }
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
        return (
          <TextField
            {...params}
            variant="outlined"
            label="Search"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        );
      }}
      renderOption={(props, option) => {
        if (option.username !== undefined) {
          if (option.divider) {
            return (
              <ListSubheader component="div">
                <span>
                  <DescriptionIcon />
                </span>
                <span>Users</span>
              </ListSubheader>
            );
          }
          return (
            <List
              {...props}
              style={{
                maxWidth: '100%',
                height: 'max-content',
                padding: '0.1rem 0',
              }}
            >
              <NextLink
                href={{
                  pathname: `/profile/${option.username}`,
                }}
                passHref
              >
                <ListItem
                  style={{
                    width: '100%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    height: '50px',
                    padding: '0',
                  }}
                  key={option.id}
                >
                  <ListItemButton
                    style={{
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    <Badge
                      color="primary"
                      badgeContent="User"
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <Avatar src={option.headImgUrl} sx={{ mr: 1.5 }} />
                    </Badge>
                    <span
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: '100%',
                      }}
                    >
                      {`${option.username}`}
                    </span>
                  </ListItemButton>
                </ListItem>
              </NextLink>
            </List>
          );
        }
        if (option.title !== undefined) {
          return (
            <List
              {...props}
              style={{
                maxWidth: '100%',
                height: 'max-content',
                padding: '0.1rem 0',
              }}
            >
              <NextLink
                href={`/post/${option.id}`}
                onClick={() => handleClick(option.id)}
                passHref
              >
                <ListItem
                  style={{
                    width: '100%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    height: '50px',
                    padding: '0',
                  }}
                  key={option.id}
                >
                  <ListItemButton
                    style={{
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    <Badge
                      color="secondary"
                      badgeContent="Post"
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <Avatar src={option.headImgUrl} sx={{ mr: 1.5 }} />
                    </Badge>
                    <span
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: '100%',
                      }}
                    >
                      {`${option.title}`}
                    </span>
                  </ListItemButton>
                </ListItem>
              </NextLink>
            </List>
          );
        }
        return null;
      }}
    />
  );
};

export default SearchBar;
