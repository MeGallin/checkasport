import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ProfileView.scss';

import {
  getUserDetailsAction,
  updateUserProfileAction,
} from '../../store/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../store/constants/userConstants';

import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const ProfileView = () => {
  const nameRegEx = /^([\w])+\s+([\w\s])+$/i;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  const passwordConfirmRegEx =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  console.log(user);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdatedProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdatedProfile;

  console.log(userUpdatedProfile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (user.isConfirmed === false) {
        setMessage(
          'In oder to update you profile you will need to confirm your email address. This can be done by referring back to the email you received when you first registered.',
        );
      }

      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetailsAction('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, user, userInfo, success]);

  const closeMessageHandler = () => {
    alert('WIP');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Contact form action
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // Dispatch UPDATED PROFILE
      if (user.isConfirmed === true) {
        dispatch(
          updateUserProfileAction({
            id: user._id,
            name,
            email,
            description,
            location,
            password,
          }),
        );
        navigate('/');
      } else {
        setMessage(
          'You have not yet confirmed your email. Please check you emails.',
        );
      }
    }
  };

  return (
    <div className="profile-view-wrapper">
      {error ? <Message message={error} onClick={closeMessageHandler} /> : null}
      {message ? (
        <Message message={message} onClick={closeMessageHandler} />
      ) : null}
      {success ? (
        <Message message={success} onClick={closeMessageHandler} />
      ) : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <fieldset className="fieldSet">
          <legend>Update Profile form</legend>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              required
              className={!nameRegEx.test(name) ? 'invalid' : 'entered'}
              error={
                !nameRegEx.test(name) && name.length !== 0
                  ? `Name field must start with an uppercase letter and contain at least 3 letters.`
                  : null
              }
            />

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

            <div>
              <label htmlFor="description">
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  name="description"
                  className={
                    description.length < 10 ? 'description invalid' : 'entered'
                  }
                />
              </label>
            </div>

            <div>
              <label htmlFor="location">
                Location
                <textarea
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  name="location"
                  className={
                    location.length < 10 ? 'location invalid' : 'entered'
                  }
                />
              </label>
            </div>

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

            <InputField
              label="Confirm Password"
              type="password"
              name={confirmPassword}
              value={confirmPassword}
              required
              className={
                !passwordConfirmRegEx.test(confirmPassword)
                  ? 'invalid'
                  : 'entered'
              }
              error={
                !passwordConfirmRegEx.test(confirmPassword) &&
                confirmPassword.length !== 0
                  ? `Password must contain at least 1 uppercase letter and a number`
                  : null
              }
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              colour="transparent"
              text="submit"
              className="btn"
              title={!user.isConfirmed ? 'User must be confirmed' : null}
              disabled={!user.isConfirmed}
            ></Button>
          </form>
        </fieldset>
      )}
    </div>
  );
};

export default ProfileView;
