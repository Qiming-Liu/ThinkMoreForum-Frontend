import { combineReducers } from 'redux';
import jwtReducer from './jwtReducer';
import signReducer from './signReducer';
import passwordReducer from './passwordReducer';

export default combineReducers({
  jwt: jwtReducer,
  sign: signReducer,
  password: passwordReducer,
});
