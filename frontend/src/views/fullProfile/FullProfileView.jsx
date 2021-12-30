import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './FullProfileView.scss';

import { userProfileByIdAction } from '../../store/actions/userActions';

import Message from '../../components/message/Message';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import LinkComp from '../../components/linkComp/LinkComp';

const FullProfileView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    // Dispatch action with id
    dispatch(userProfileByIdAction(id));
    return () => {
      console.log('Full Profile cleanup');
    };
  }, [dispatch, id]);

  const userProfiles = useSelector((state) => state.userProfileById);
  const { loading, error, profile } = userProfiles;

  return (
    <div>
      {error ? <Message message={error} /> : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {error ? null : (
            <>
              <LinkComp route="" routeName="GO BACK" />
              <div className="full-profile-wrapper">
                <div className="item">
                  <h1>{profile?.name}</h1>
                  <img
                    src={`../uploads/profiles/${profile?.profileImage}`}
                    alt={profile?.name}
                  />
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
