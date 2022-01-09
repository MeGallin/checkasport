import axios from 'axios';

import {
  USER_REVIEW_ID_FAILURE,
  USER_REVIEW_ID_REQUEST,
  USER_REVIEW_ID_SUCCESS,
  USER_REVIEW_LOGIN_FAILURE,
  USER_REVIEW_LOGIN_REQUEST,
  USER_REVIEW_LOGIN_SUCCESS,
} from '../constants/userReviewConstants';

export const userReviewLoginAction =
  (email, password, userProfileId) => async (dispatch) => {
    console.log('ACTION', userProfileId);
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
      console.log(data);
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
// Grabbing the USER/TRAINER ID
export const userReviewIdAction = (userProfileId) => async (dispatch) => {
  console.log('action ====>', userProfileId);
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
