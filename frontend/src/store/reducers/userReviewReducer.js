import {
  USER_REVIEWER_REGISTER_FAILURE,
  USER_REVIEWER_REGISTER_REQUEST,
  USER_REVIEWER_REGISTER_SUCCESS,
  USER_REVIEW_CREATE_COMMENT_FAILURE,
  USER_REVIEW_CREATE_COMMENT_REQUEST,
  USER_REVIEW_CREATE_COMMENT_RESET,
  USER_REVIEW_CREATE_COMMENT_SUCCESS,
  USER_REVIEW_ID_FAILURE,
  USER_REVIEW_ID_REQUEST,
  USER_REVIEW_ID_SUCCESS,
  USER_REVIEW_LOGIN_FAILURE,
  USER_REVIEW_LOGIN_REQUEST,
  USER_REVIEW_LOGIN_SUCCESS,
  USER_REVIEW_LOGOUT,
} from '../constants/userReviewConstants';

//Reviewer login
export const userReviewLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REVIEW_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_REVIEW_LOGIN_SUCCESS:
      return { ...state, loading: false, userReviewInfo: action.payload };
    case USER_REVIEW_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case USER_REVIEW_LOGOUT:
      return {};

    default:
      return { ...state };
  }
};
//Reviewer Register
export const userReviewerRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REVIEWER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REVIEWER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userReviewerInfo: action.payload,
        success: true,
        error: null,
      };
    case USER_REVIEWER_REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
//Get ID of trainer to review
export const userReviewIdReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REVIEW_ID_REQUEST:
      return { ...state, loading: true };
    case USER_REVIEW_ID_SUCCESS:
      return { ...state, loading: false, userProfileId: action.payload };
    case USER_REVIEW_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
// Post reviews
export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REVIEW_CREATE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case USER_REVIEW_CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case USER_REVIEW_CREATE_COMMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case USER_REVIEW_CREATE_COMMENT_RESET:
      return { userReviewerInfo: {} };

    default:
      return { ...state };
  }
};
