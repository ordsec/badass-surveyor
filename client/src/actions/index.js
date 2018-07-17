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

  dispatch({ type: FETCH_USER, payload: res.data });
};

// this action is responsible for sending a POST request
// to our backend API with the token we get from stripe
// as a result of submitting a payment. the back end will
// respond with a user model instance that will have the
// updated `credits` property
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');

  dispatch({ type: FETCH_USER, payload: res.data });
};
