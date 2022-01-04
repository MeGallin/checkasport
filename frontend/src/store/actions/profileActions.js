import axios from 'axios';
import {
  PROFILE_ADMIN_FAILURE,
  PROFILE_ADMIN_REQUEST,
  PROFILE_ADMIN_SUCCESS,
  PROFILE_BY_ID_FAILURE,
  PROFILE_BY_ID_REQUEST,
  PROFILE_BY_ID_SUCCESS,
  PROFILE_CREATE_FAILURE,
  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_OF_LOGGED_IN_USER_FAILURE,
  PROFILE_OF_LOGGED_IN_USER_REQUEST,
  PROFILE_OF_LOGGED_IN_USER_SUCCESS,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
} from '../constants/profileConstants';

// Get all profiles public
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
// Get all profiles ADMIN
export const profilesAdminAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_ADMIN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/profiles/admin`,
      config,
    );
    dispatch({ type: PROFILE_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_ADMIN_FAILURE,
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
// Get profile of logging user
export const profileOfLoggedInUserAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_OF_LOGGED_IN_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/profile/`,
      config,
    );

    dispatch({ type: PROFILE_OF_LOGGED_IN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_OF_LOGGED_IN_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Create a profile
export const createProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/profiles`,
      {},
      config,
    );
    dispatch({ type: PROFILE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update Profile action
export const profileUpdateAction = (profile) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/profile/${userInfo._id}`,
      profile,
      config,
    );

    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });

    dispatch(profileOfLoggedInUserAction());
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
