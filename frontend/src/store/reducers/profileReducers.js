import {
  PROFILE_BY_ID_FAILURE,
  PROFILE_BY_ID_REQUEST,
  PROFILE_BY_ID_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_RESET,
  PROFILE_SUCCESS,
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
