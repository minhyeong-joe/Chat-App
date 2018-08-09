import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './reducer_user';
import chatReducer from './reducer_chat';

const rootReducer = combineReducers({
  form: formReducer,
  userInfo: userReducer,
  chatLog: chatReducer
});

export default rootReducer;
