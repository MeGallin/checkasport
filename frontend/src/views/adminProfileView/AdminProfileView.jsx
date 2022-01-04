import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AdminProfileView.scss';

import { profilesAdminAction } from '../../store/actions/profileActions';

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
  const { loading, error, profilesAdmin } = profilesState;

  console.log('GGGG', profilesAdmin);

  return (
    <>
      {error ? <Message message={error} /> : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="admin-profile-view-wrapper">
          <div className="heading admin-profile-inner-wrapper">
            <div className="item">NAME</div>
            <div className="item">Qualifications</div>
            <div className="item">Description</div>
            <div className="item">Rating</div>
            <div className="item">Reviews</div>
            <div className="item">CREATED</div>
            <div className="item">UPDATED</div>
          </div>
          {profilesAdmin.map((profile) => (
            <div key={profile._id} className="admin-profile-inner-wrapper">
              <div className="item">
                <p>{profile.name}</p>
                <img
                  className="image"
                  src={`../uploads/profiles/${profile.profileImage}`}
                  alt={profile.name}
                />
                <p>{profile.email}</p>
                <p>Contact number:{profile.telephoneNumber}</p>
              </div>

              <div className="item">
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
              </div>

              <div className="item">
                <h6>Description</h6>
                {profile.description}
                <h6>Location</h6>
                {profile.description}
                <h6>Key Words</h6>
                {profile.keyWordSearch}
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
