import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ReviewerLoginView.scss';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import LinkComp from '../../components/linkComp/LinkComp';
import { userReviewLoginAction } from '../../store/actions/userReviewActions';

const ReviewerLoginView = () => {
  const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userReviewLogin = useSelector((state) => state.userReviewLogin);
  const { loading, error } = userReviewLogin;

  const userId = useSelector((state) => state.userReviewId);
  const { userReviewId } = userId;

  // console.log(user_reviewInfo);
  console.log(userReviewId);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch login
    dispatch(userReviewLoginAction(email, password, userReviewId));
  };

  return (
    <div className="user-review-login-wrapper">
      {error ? <Message message={error} /> : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <fieldset className="fieldSet">
          <legend>Review a Trainer Login form</legend>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              name={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
              error={
                !emailRegEx.test(email) && email.length !== 0
                  ? `Invalid email address.`
                  : null
              }
            />
            <InputField
              label="Password"
              type="password"
              name={password}
              value={password}
              required
              className={!passwordRegEx.test(password) ? 'invalid' : 'entered'}
              error={
                !passwordRegEx.test(password) && password.length !== 0
                  ? `Password must contain at least 1 uppercase letter and a number`
                  : null
              }
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              colour="transparent"
              text="submit"
              className="btn"
              disabled={
                !passwordRegEx.test(password) || !emailRegEx.test(email)
              }
            ></Button>
          </form>
        </fieldset>
      )}

      <div>
        <p>
          New to our platform ?{' '}
          <LinkComp
            route="registration-review"
            routeName="Register to review"
          />{' '}
          here.
        </p>
      </div>
    </div>
  );
};

export default ReviewerLoginView;
