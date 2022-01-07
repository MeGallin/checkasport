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
  userDeleteReducer,
} from './reducers/userReducers';

import {
  profilesReducer,
  profilesAdminReducer,
  profileByIdReducer,
  profileOfLoggedInUserReducer,
  profileCreateReducer,
  profileUpdateReducer,
  profileDeleteReducer,
} from './reducers/profileReducers';

import { userReviewLoginReducer } from './reducers/userReviewReducer';

const reducer = combineReducers({
  contactForm: contactFormReducer,
  users: usersReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  userDetails: userDetailsReducer,
  userProfileById: userProfileByIdReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  profiles: profilesReducer,
  profilesAdmin: profilesAdminReducer,
  profileById: profileByIdReducer,
  profileOfLoggedInUser: profileOfLoggedInUserReducer,
  profileCreate: profileCreateReducer,
  profileUpdate: profileUpdateReducer,
  profileDelete: profileDeleteReducer,
  userReviewLogin: userReviewLoginReducer,
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
