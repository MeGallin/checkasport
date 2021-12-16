import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { contactFormReducer } from './reducers/contactFormReducers';
import { servicesListReducer } from './reducers/servicesReducers';

const reducer = combineReducers({
  servicesList: servicesListReducer,
  contactForm: contactFormReducer,
});

const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
