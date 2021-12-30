import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { contactFormReducer } from './reducers/contactFormReducers';

import {
  userLoginReducer,
  userRegistrationReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userProfileByIdReducer,
} from './reducers/userReducers';

import { profilesReducer } from './reducers/profileReducers';

const reducer = combineReducers({
  contactForm: contactFormReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  userDetails: userDetailsReducer,
  userProfileById: userProfileByIdReducer,
  userUpdateProfile: userUpdateProfileReducer,
  profiles: profilesReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const middleware = [thunk];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
