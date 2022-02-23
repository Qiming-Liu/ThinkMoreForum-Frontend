import { combineReducers } from 'redux';
import signReducer from './signReducer';

export default combineReducers({
  sign: signReducer,
});
