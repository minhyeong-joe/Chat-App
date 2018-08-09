import { CREATE_USER, USER_AUTH, USER_LOGOUT } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case CREATE_USER:
      return action.payload.data;
    case USER_AUTH:
      return action.payload.data;
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}
