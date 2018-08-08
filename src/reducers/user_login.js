import { USER_AUTH } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case USER_AUTH:
      return action.payload.data;
    default:
  }
  return state;
}
