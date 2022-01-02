import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './FullProfileView.scss';

import { profileByIdAction } from '../../store/actions/profileActions';

import Message from '../../components/message/Message';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import LinkComp from '../../components/linkComp/LinkComp';

import moment from 'moment';

const FullProfileView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    // Dispatch action with id
    dispatch(profileByIdAction(id));
    return () => {
      console.log('Full Profile cleanup');
    };
  }, [dispatch, id]);

  const profileState = useSelector((state) => state.profileById);
  const { loading, error, profile } = profileState;

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {error ? (
            <Message message={error} />
          ) : (
            <>
              <LinkComp route="" routeName="GO BACK" />
              <div className="full-profile-wrapper">
                <div className="item">
                  <h1>{profile?.name}</h1>
                  <img
                    src={`../uploads/profiles/${profile?.profileImage}`}
                    alt={profile?.name}
                  />
                  <h3>{profile?.category}</h3>
                  <h3>{profile?.rating} rating</h3>
                  <h3>{profile?.numReviews} reviews</h3>
                  <p>Create: {moment(profile?.createdAt).fromNow()}</p>
                  <p>
                    Profile last updated: {moment(profile?.updatedAt).fromNow()}
                  </p>
                </div>

                <div className="item">
                  <h1>A little about me</h1>
                  <p>{profile?.description}</p>
                </div>

                <div className="item">
                  <h1>Contact Details</h1>
                  <p>{profile?.location}</p>
                  <p>Mobile number: {profile?.telephoneNumber}</p>
                  <p>email: {profile?.email}</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FullProfileView;
