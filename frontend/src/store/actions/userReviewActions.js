import axios from 'axios';

import {
  USER_REVIEWER_REGISTER_FAILURE,
  USER_REVIEWER_REGISTER_REQUEST,
  USER_REVIEWER_REGISTER_SUCCESS,
  USER_REVIEW_ID_FAILURE,
  USER_REVIEW_ID_REQUEST,
  USER_REVIEW_ID_SUCCESS,
  USER_REVIEW_LOGIN_FAILURE,
  USER_REVIEW_LOGIN_REQUEST,
  USER_REVIEW_LOGIN_SUCCESS,
  USER_REVIEW_LOGOUT,
} from '../constants/userReviewConstants';

// User REVIEWER LOGIN
export const userReviewLoginAction =
  (email, password, userProfileId) => async (dispatch) => {
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
        { email: email, password: password, userProfileId: userProfileId },
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
// Reviewer Registration actions
export const reviewerRegisterAction =
  (name, email, password, userProfileId) => async (dispatch) => {
    console.log('ACTION', userProfileId);
    try {
      dispatch({
        type: USER_REVIEWER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/users-review',
        {
          name: name,
          email: email,
          password: password,
          userProfileId: userProfileId,
        },
        config,
      );

      dispatch({ type: USER_REVIEWER_REGISTER_SUCCESS, payload: data });
      // Replace this to redirect to login
      // dispatch({ type: USER_REVIEWER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userReviewInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REVIEWER_REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
//Reviewer logout action
export const reviewLogoutAction = () => (dispatch) => {
  localStorage.removeItem('userReviewInfo');
  dispatch({ type: USER_REVIEW_LOGOUT });
};

// Grabbing the USER/TRAINER ID
export const userReviewIdAction = (userProfileId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REVIEW_ID_REQUEST,
    });

    dispatch({ type: USER_REVIEW_ID_SUCCESS, payload: userProfileId });
  } catch (error) {
    dispatch({
      type: USER_REVIEW_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
