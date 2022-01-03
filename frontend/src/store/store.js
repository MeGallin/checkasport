import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { contactFormReducer } from './reducers/contactFormReducers';

import {
  usersReducer,
  userLoginReducer,
  userRegistrationReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userProfileByIdReducer,
} from './reducers/userReducers';

import {
  profilesReducer,
  profileByIdReducer,
  profileOfLoggedInUserReducer,
  profileCreateReducer,
  profileUpdateReducer,
} from './reducers/profileReducers';

const reducer = combineReducers({
  contactForm: contactFormReducer,
  users: usersReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  userDetails: userDetailsReducer,
  userProfileById: userProfileByIdReducer,
  userUpdateProfile: userUpdateProfileReducer,
  profiles: profilesReducer,
  profileById: profileByIdReducer,
  profileOfLoggedInUser: profileOfLoggedInUserReducer,
  profileCreate: profileCreateReducer,
  profileUpdate: profileUpdateReducer,
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
