import {
  PROFILE_BY_ID_FAILURE,
  PROFILE_BY_ID_REQUEST,
  PROFILE_BY_ID_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_OF_LOGGED_IN_USER_FAILURE,
  PROFILE_OF_LOGGED_IN_USER_REQUEST,
  PROFILE_OF_LOGGED_IN_USER_SUCCESS,
  PROFILE_REQUEST,
  PROFILE_RESET,
  PROFILE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_RESET,
  PROFILE_UPDATE_SUCCESS,
} from '../constants/profileConstants';

// Get all profiles
export const profilesReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, loading: true };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: action.payload,
      };
    case PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_RESET:
      return { profiles: [] };
    default:
      return { ...state };
  }
};
// Get profile by ID
export const profileByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case PROFILE_BY_ID_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case PROFILE_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
// Get profile of logged in user
export const profileOfLoggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_OF_LOGGED_IN_USER_REQUEST:
      return { ...state, loading: true };
    case PROFILE_OF_LOGGED_IN_USER_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case PROFILE_OF_LOGGED_IN_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
// UPdate profile
export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        profile: action.payload,
      };
    case PROFILE_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_UPDATE_RESET:
      return { profile: {} };

    default:
      return { ...state };
  }
};
