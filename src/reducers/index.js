import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import createUserReducer from './reducers_create_user';
import authReducer from './reducer_auth_user';

const rootReducer = combineReducers({
  form: formReducer,
  createUser: createUserReducer,
  userInfo: authReducer,
});

export default rootReducer;
