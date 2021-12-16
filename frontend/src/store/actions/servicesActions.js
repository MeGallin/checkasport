import axios from 'axios';
import {
  SERVICES_LIST_FAIL,
  SERVICES_LIST_REQUEST,
  SERVICES_LIST_SUCCESS,
} from '../constants/servicesConstants';

export const listServicesAction = () => async (dispatch) => {
  try {
    dispatch({ type: SERVICES_LIST_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/api/services`);
    dispatch({ type: SERVICES_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
