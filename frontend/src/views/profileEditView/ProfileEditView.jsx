import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ProfileEditView.scss';

import {
  profileOfLoggedInUserAction,
  profileUpdateAction,
} from '../../store/actions/profileActions';

import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const ProfileEditView = () => {
  const nameRegEx = /^([\w])+\s+([\w\s])+$/i;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const telephoneNumberRegEx = /^(07[\d]{8,12}|447[\d]{7,11})$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged in user Details saved in local storage
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      // Dispatch action with id
      dispatch(profileOfLoggedInUserAction());
    }

    const abortConst = new AbortController();
    return () => {
      abortConst.abort();
      console.log('ProfileEditView useEffect cleaned');
    };
  }, [navigate, dispatch, userInfo]);

  // Profile details in DB
  const profileState = useSelector((state) => state.profileOfLoggedInUser);
  const { loading, error, profile } = profileState;

  const [name, setName] = useState(profile[0].name || '');
  const [email, setEmail] = useState(profile[0].email || '');
  const [profileImage, setProfileImage] = useState(
    profile[0].profileImage || '',
  );
  const [description, setDescription] = useState(profile[0].description || '');
  const [category, setCategory] = useState(profile[0].category || '');
  const [qualifications, setQualifications] = useState(
    profile[0].qualifications || '',
  );
  const [location, setLocation] = useState(profile[0].location || '');
  const [telephoneNumber, setTelephoneNumber] = useState(
    profile[0].telephoneNumber || '',
  );

  console.log(profile);

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

  return (
    <div className="profile-edit-wrapper">
      {error ? <Message message={error} /> : null}
      {profile === undefined || profile.length === 0 ? (
        <>Create profile button</>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <fieldset className="fieldSet item">
            <legend>Update PROFILE form</legend>
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

              <div>
                <label for="description">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  name="description"
                  required
                  className={true ? 'invalid' : 'entered'}
                />
              </div>

              <InputField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                name="category"
                required
                className={true ? 'invalid' : 'entered'}
              />

              <div>
                <label for="Qualifications">Qualifications</label>
                <textarea
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  type="text"
                  name="qualifications"
                  required
                  className={true ? 'invalid' : 'entered'}
                />
              </div>

              <div>
                <label for="Location">Location</label>
                <textarea
                  value={location}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  name="location"
                  required
                  className={true ? 'invalid' : 'entered'}
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
                  !telephoneNumberRegEx.test(telephoneNumber) &&
                  telephoneNumber.length !== 0
                    ? `Name field must start with an uppercase letter and contain at least 3 letters.`
                    : null
                }
              />

              <Button
                colour="transparent"
                text="submit"
                className="btn"
                title="Submit"
                disabled={false}
              ></Button>
            </form>
          </fieldset>
        </>
      )}
    </div>
  );
};

export default ProfileEditView;
