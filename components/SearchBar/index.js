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
import { InputAdornment, Link } from '@mui/material';
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
            <List {...props} sx={{ marginLeft: -4 }}>
              <ListItem sx={{ height: 40 }} key={option.id}>
                <NextLink
                  href={{
                    pathname: `/profile/${option.username}`,
                  }}
                  passHref
                >
                  <ListItemButton>
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
                    <NextLink
                      href={{
                        pathname: `/profile/${option.username}`,
                      }}
                      passHref
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        whiteSpace: 'nowrap',
                        display: 'block',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        width: '16rem',
                      }}
                    >
                      {`${option.username}`}
                    </NextLink>
                  </ListItemButton>
                </NextLink>
              </ListItem>
            </List>
          );
        }
        if (option.title !== undefined) {
          return (
            <List {...props} sx={{ marginLeft: -4 }}>
              <ListItem
                sx={{
                  height: 40,
                }}
                key={option.id}
              >
                <NextLink
                  href={`/post/${option.id}`}
                  onClick={() => handleClick(option.id)}
                  passHref
                >
                  <ListItemButton>
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
                    <Link
                      href={`/post/${option.id}`}
                      onClick={() => handleClick(option.id)}
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        whiteSpace: 'nowrap',
                        display: 'block',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        width: '16rem',
                      }}
                    >
                      {`${option.title}`}
                    </Link>
                  </ListItemButton>
                </NextLink>
              </ListItem>
            </List>
          );
        }
        return null;
      }}
    />
  );
};

export default SearchBar;
