import { combineReducers } from 'redux';
import signReducer from './signReducer';
import passwordReducer from './passwordReducer';

export default combineReducers({
  sign: signReducer,
  password: passwordReducer,
});
