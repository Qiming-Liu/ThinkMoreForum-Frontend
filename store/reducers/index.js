import { combineReducers } from 'redux';
import signReducer from './signReducer';
import passwordResetReducer from './passwordResetReducer';

export default combineReducers({
  sign: signReducer,
  passwordReset: passwordResetReducer,
});
