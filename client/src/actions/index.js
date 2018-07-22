import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS } from './types';

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
// to our back end API with the token we get from stripe
// as a result of submitting a payment. the back end will
// respond with a user model instance that will have the
// updated `credits` property
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

// send POST request to the `/api/surveys` route of our
// back end API with the payload of `values`, which is
// what we receive from the new survey form via redux-form.
// once again, we receive the updated user model instance
// with the updated number of credits (one subtracted)
export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');

  dispatch({ type: FETCH_USER, payload: res.data });
};

// pull all of the current user's surveys from the API
export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
