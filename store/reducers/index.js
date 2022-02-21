import { combineReducers } from 'redux';
import { postReducer } from './postReducer';
import passwordReducer from './passwordReducer';

export default combineReducers({
  post: postReducer,
  password: passwordReducer,
});
