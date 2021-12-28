import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ProfileView.scss';

import axios from 'axios';

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
  const telephoneNumberRegEx = /^(07[\d]{8,12}|447[\d]{7,11})$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdatedProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdatedProfile;

  const userProfiles = useSelector((state) => state.userProfiles);
  const { profiles } = userProfiles;

  const userProfileInfo = profiles.filter((profile) => {
    return profile?._id === userInfo?._id;
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(
    userProfileInfo[0]?.profileImage || '',
  );
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState('');

  const [description, setDescription] = useState(
    userProfileInfo[0]?.description || '',
  );
  const [location, setLocation] = useState(userProfileInfo[0]?.location || '');
  const [telephoneNumber, setTelephoneNumber] = useState(
    userProfileInfo[0]?.telephoneNumber || '',
  );

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
        setProfileImage(profileImage);
        setEmail(user.email);
        setDescription(description);
        setLocation(location);
        setTelephoneNumber(telephoneNumber);
      }
    }
    const abortConst = new AbortController();
    return () => {
      abortConst.abort();
      console.log('useEffect cleaned');
    };
  }, [
    dispatch,
    navigate,
    user,
    userInfo,
    profileImage,
    success,
    description,
    location,
    telephoneNumber,
  ]);

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
            profileImage,
            email,
            description,
            location,
            password,
            telephoneNumber,
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

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/profileUpload',
        formData,
        config,
      );

      setProfileImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <div className="profile-view-wrapper">
      {error ? <Message message={error} /> : null}
      {message ? <Message message={message} /> : null}
      {success ? <Message message={success} /> : null}
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
              name="email"
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
              label="Profile Image"
              type="text"
              name="profileImage"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
            />
            {uploading ? <LoadingSpinner /> : null}
            <InputField type="file" name="files" onChange={uploadFileHandler} />

            <div>
              <label htmlFor="description">
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  name="description"
                  className={
                    description?.length < 10 ? 'description invalid' : 'entered'
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
                    location?.length < 10 ? 'location invalid' : 'entered'
                  }
                />
              </label>
            </div>
            <InputField
              label="Telephone Number"
              type="tel"
              name="telephoneNumber"
              value={telephoneNumber}
              onChange={(e) => setTelephoneNumber(e.target.value)}
              className={
                !telephoneNumberRegEx.test(telephoneNumber)
                  ? 'invalid'
                  : 'entered'
              }
              error={
                !telephoneNumberRegEx.test(telephoneNumber) &&
                telephoneNumber?.length !== 0
                  ? `Invalid telephone Number.`
                  : null
              }
            />
            <label>
              <input
                type="checkbox"
                defaultChecked={!hidePassword}
                onChange={() => setHidePassword(!hidePassword)}
              />
              {!hidePassword
                ? 'Hide Password Settings'
                : 'Show Password Settings'}
            </label>
            {!hidePassword ? (
              <div>
                <InputField
                  label="Password"
                  type="password"
                  name={password}
                  value={password}
                  required
                  className={
                    !passwordRegEx.test(password) ? 'invalid' : 'entered'
                  }
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
              </div>
            ) : null}
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
