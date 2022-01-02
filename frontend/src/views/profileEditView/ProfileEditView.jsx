import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ProfileEditView.scss';

import {
  profileOfLoggedInUserAction,
  createProfileAction,
  profileUpdateAction,
} from '../../store/actions/profileActions';

import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const ProfileEditView = () => {
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const telephoneNumberRegEx = /^(07[\d]{8,12}|447[\d]{7,11})$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged in user Details saved in local storage
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Profile details in DB
  const profileState = useSelector((state) => state.profileOfLoggedInUser);
  const { loading, error, profile } = profileState;

  console.log('cccccc', profile);

  const [name, setName] = useState(profile?.name);
  const [email, setEmail] = useState(profile?.email);
  const [profileImage, setProfileImage] = useState(profile?.profileImage);
  const [description, setDescription] = useState(profile?.description);
  const [category, setCategory] = useState(profile?.category);
  const [qualifications, setQualifications] = useState(profile?.qualifications);
  const [location, setLocation] = useState(profile?.location);
  const [telephoneNumber, setTelephoneNumber] = useState(
    profile?.telephoneNumber,
  );

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!profile) {
      dispatch(profileOfLoggedInUserAction());
    }

    const abortConst = new AbortController();
    return () => {
      abortConst.abort();
      console.log('ProfileEditView useEffect cleaned');
    };
  }, [navigate, dispatch, userInfo, profile]);

  const handleCreateProfile = () => {
    // Dispatch create profile action
    dispatch(createProfileAction());
    navigate('/user-profile-edit');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch UPDATE PROFILE Action
    dispatch(
      profileUpdateAction({
        name,
        email,
        profileImage,
        description,
        category,
        qualifications,
        location,
        telephoneNumber,
      }),
    );
  };

  const isDisabled =
    name?.length === 0 ||
    !emailRegEx.test(email) ||
    description?.length < 10 ||
    category?.length <= 10 ||
    location?.length <= 10 ||
    !telephoneNumberRegEx.test(telephoneNumber);

  return (
    <div className="profile-edit-wrapper">
      {error ? <Message message={error} /> : null}
      {!profile ? 'NOT PROFILE' : 'YES'}
      {!profile ? (
        <>
          <h3>Create a profile</h3>
          <p>Please click the button below to create a sample profile.</p>
          <p>You will then be re-directed to your USER profile page.</p>
          <Button
            colour="transparent"
            text="Create your profile"
            className="btn"
            title="Create your profile"
            disabled={false}
            onClick={handleCreateProfile}
          ></Button>
        </>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <fieldset className="fieldSet item">
            <legend>Update PROFILE form</legend>
            <p>
              Please note that the more complete your profile is the better it
              will feature when it is searched....
            </p>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                required
                className={name?.length === 0 ? 'invalid' : 'entered'}
                error={name?.length === 0 ? `Name field cant be empty!` : null}
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                error={
                  !emailRegEx.test(email) ? `Invalid email address.` : null
                }
              />
              <InputField
                label="Profile Image"
                type="text"
                name="profileImage"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />

              <div>
                <label>Description </label>
                {description?.length < 10 ? (
                  <span className="small-text">
                    must have at least {description.length} characters.
                  </span>
                ) : null}
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  name="description"
                  required
                  className={description?.length <= 10 ? 'invalid' : 'entered'}
                  error={
                    description?.length <= 10
                      ? `Description field must contain at least 10 characters!`
                      : null
                  }
                />
              </div>

              <InputField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                name="category"
                required
                className={category?.length <= 10 ? 'invalid' : 'entered'}
                error={
                  category?.length <= 10
                    ? `Category field must contain at least 10 characters!`
                    : null
                }
              />

              <div>
                <label>Qualifications</label>
                <textarea
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  type="text"
                  name="qualifications"
                  required
                  className={
                    qualifications?.length <= 10 ? 'invalid' : 'entered'
                  }
                  error={
                    qualifications?.length <= 10
                      ? `Qualifications field must contain at least 10 characters!`
                      : null
                  }
                />
              </div>

              <div>
                <label>Location</label>
                <textarea
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  name="location"
                  required
                  className={location?.length <= 10 ? 'invalid' : 'entered'}
                  error={
                    location?.length <= 10
                      ? `Location field must contain at least 10 characters!`
                      : null
                  }
                />
              </div>

              <InputField
                label="Telephone Number"
                value={telephoneNumber}
                onChange={(e) => setTelephoneNumber(e.target.value)}
                type="text"
                name="telephoneNumber"
                required
                className={
                  !telephoneNumberRegEx.test(telephoneNumber)
                    ? 'invalid'
                    : 'entered'
                }
                error={
                  !telephoneNumberRegEx.test(telephoneNumber) ||
                  telephoneNumber?.length === 0
                    ? `Invalid mobile number`
                    : null
                }
              />

              <Button
                colour="transparent"
                text="submit"
                className="btn"
                title="Submit"
                disabled={isDisabled}
              ></Button>
            </form>
          </fieldset>
        </>
      )}
    </div>
  );
};

export default ProfileEditView;
