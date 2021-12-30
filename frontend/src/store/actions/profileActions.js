import axios from 'axios';
import {
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from '../constants/profileConstants';

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
