import { combineReducers } from 'redux';
import signReducer from './signReducer';
<<<<<<< Updated upstream
=======
import passwordReducer from './passwordReducer';
import passwordResetReducer from './passwordResetReducer';
>>>>>>> Stashed changes

export default combineReducers({
  sign: signReducer,
<<<<<<< Updated upstream
=======
  password: passwordReducer,
  passwordReset: passwordResetReducer,
>>>>>>> Stashed changes
});
