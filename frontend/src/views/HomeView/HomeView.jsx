import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfilesAction } from '../../store/actions/userActions';
import './HomeView.scss';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Card from '../../components/card/Card';

const HomeView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfilesAction());
  }, [dispatch]);

  const userProfiles = useSelector((state) => state.userProfiles);
  const { loading, error, profiles } = userProfiles;

  console.log('Home Comp', profiles);

  const closeMessageHandler = () => {
    alert('WIP');
  };

  return (
    <>
      {error ? <Message message={error} onClick={closeMessageHandler} /> : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="home-view ">
          <h1>Services</h1>
          <div className="card-wrapper">
            {profiles?.map((profile) => {
              return !profile.isAdmin ? (
                <div key={profile._id}>
                  <Card
                    className="card"
                    name={profile.name}
                    src={profile.image}
                    alt={profile.name}
                    description={profile.description}
                    location={profile.location}
                    email={profile.email}
                  />
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeView;
