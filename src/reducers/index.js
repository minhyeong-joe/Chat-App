import { combineReducers } from 'redux';
import UserInfoReducer from './user_login';

const rootReducer = combineReducers({
  user: UserInfoReducer,
});

export default rootReducer;
