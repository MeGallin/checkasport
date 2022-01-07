import axios from 'axios';

import {
  USER_REVIEW_LOGIN_FAILURE,
  USER_REVIEW_LOGIN_REQUEST,
  USER_REVIEW_LOGIN_SUCCESS,
} from '../constants/userReviewConstants';

export const userReviewLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REVIEW_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/users-review/login',
      { email: email, password: password },
      config,
    );
    dispatch({ type: USER_REVIEW_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userReviewInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REVIEW_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
