import {
  USER_REVIEW_ID_FAILURE,
  USER_REVIEW_ID_REQUEST,
  USER_REVIEW_ID_SUCCESS,
  USER_REVIEW_LOGIN_FAILURE,
  USER_REVIEW_LOGIN_REQUEST,
  USER_REVIEW_LOGIN_SUCCESS,
  USER_REVIEW_LOGOUT,
} from '../constants/userReviewConstants';

export const userReviewLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REVIEW_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_REVIEW_LOGIN_SUCCESS:
      return { ...state, loading: false, user_reviewInfo: action.payload };
    case USER_REVIEW_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case USER_REVIEW_LOGOUT:
      return {};

    default:
      return { ...state };
  }
};

export const userReviewIdReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REVIEW_ID_REQUEST:
      return { ...state, loading: true };
    case USER_REVIEW_ID_SUCCESS:
      return { ...state, loading: false, userReviewId: action.payload };
    case USER_REVIEW_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
