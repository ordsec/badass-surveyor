import axios from 'axios';

import { FETCH_USER } from './types';

// with redux-thunk, this action generator returns
// a function rather than an action object. the returned
// function accepts a `dispatch`, which is called once
// the async part is done, and there's some data from
// the server - only then the FETCH_USER action is
// dispatched.
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current-user');

  dispatch({ type: FETCH_USER, payload: res });
};
