import { combineReducers } from 'redux';
import { postReducer } from './postReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  post: postReducer,
  users: usersReducer,
});
