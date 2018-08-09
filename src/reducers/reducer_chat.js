import { FETCH_CHATS } from '../actions';
import _ from 'lodash'

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_CHATS:
      return _.mapKeys(action.payload.data.data, 'id');
    default:
      return state;
  }
}
