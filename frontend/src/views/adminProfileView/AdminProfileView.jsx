import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AdminProfileView.scss';

import {
  profilesAdminAction,
  deleteProfileAction,
  profileVerifyQualificationAction,
} from '../../store/actions/profileActions';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Button from '../../components/button/Button';

import moment from 'moment';

const AdminProfileView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged in user Details saved in local storage
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
    dispatch(profilesAdminAction());
  }, [dispatch, navigate, userInfo]);

  const profilesState = useSelector((state) => state.profilesAdmin);
  const { loading, error, success, profilesAdmin } = profilesState;

  const handleDeleteProfile = (id) => {
    // Dispatch user delete action
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      dispatch(deleteProfileAction(id));
    }
  };

  const handleVerify = (id) => {
    // Dispatch verify qualification
    if (window.confirm(`Are you sure you want to update this ${id}`)) {
      dispatch(profileVerifyQualificationAction(id));
    }
  };

  return (
    <>
      {error ? <Message message={error} /> : null}
      {success ? (
        <Message message="Profile has been successfully deleted" />
      ) : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="admin-profile-view-wrapper">
          <p>There currently {profilesAdmin.length} profiles.</p>
          <div className="heading admin-profile-inner-wrapper">
            <div className="item">NAME</div>
            <div className="item">Qualifications Verified</div>
            <div className="item wider-item">Description</div>
            <div className="item">Rating</div>
            <div className="item">Reviews</div>
            <div className="item">CREATED</div>
            <div className="item">UPDATED</div>
          </div>
          {profilesAdmin.map((profile) => (
            <div key={profile._id} className="admin-profile-inner-wrapper">
              <div className="item">
                <Button
                  colour="transparent"
                  text="Delete Profile"
                  className="btn"
                  title="Delete Profile"
                  onClick={() => handleDeleteProfile(profile._id)}
                  disabled={!profile._id}
                ></Button>
                <p>{profile.name}</p>
                <img
                  className="image"
                  src={`../uploads/profiles/${profile.profileImage}`}
                  alt={profile.name}
                />
                <p>{profile.email}</p>
                <p>{profile.telephoneNumber}</p>
              </div>

              <div className="item">
                <>
                  <Button
                    colour="transparent"
                    text="Verify Qualifications"
                    className="btn"
                    title="Verify Qualifications"
                    onClick={() => handleVerify(profile._id)}
                    disabled={!profile._id}
                  ></Button>

                  {profile.isQualificationsVerified === true ? (
                    <i
                      className="fa fa-check"
                      style={{
                        fontSize: 20 + 'px',
                        color: 'rgba(92, 184, 92, 1)',
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa fa-times"
                      style={{ fontSize: 20 + 'px', color: 'crimson' }}
                    ></i>
                  )}
                </>
              </div>

              <div className="item wider-item">
                <h3>Description</h3>
                {profile.description}
                <h3>Location</h3>
                {profile.location}
              </div>

              <div className="item">{profile.rating}</div>

              <div className="item">{profile.numReviews}</div>

              <div className="item">{moment(profile.createdAt).fromNow()}</div>

              <div className="item">{moment(profile.updatedAt).fromNow()}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminProfileView;
