import {
  SERVICES_LIST_FAIL,
  SERVICES_LIST_REQUEST,
  SERVICES_LIST_SUCCESS,
} from '../constants/servicesConstants';

export const servicesListReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICES_LIST_REQUEST:
      return { ...state, loading: true, success: false, services: [] };
    case SERVICES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        services: action.payload,
      };
    case SERVICES_LIST_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
