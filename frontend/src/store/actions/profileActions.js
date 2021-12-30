import axios from 'axios';
import {
  PROFILE_BY_ID_FAILURE,
  PROFILE_BY_ID_REQUEST,
  PROFILE_BY_ID_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from '../constants/profileConstants';

// Get all profiles
export const profilesAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:5000/api/profiles`);
    dispatch({ type: PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Get profile by ID
export const profileByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_BY_ID_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/api/profile/${id}`);

    dispatch({ type: PROFILE_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
