import {
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
