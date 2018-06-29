import { FETCH_USER } from '../actions/types';

// null: request still pending
// action.payload: user model when logged in
// false: not logged in
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
