import { USER_AUTH } from '../actions';
import { USER_LOGOUT } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case USER_AUTH:
      return action.payload;
    case USER_LOGOUT:
      return action.payload;
    default:
      return state;
  }
}
