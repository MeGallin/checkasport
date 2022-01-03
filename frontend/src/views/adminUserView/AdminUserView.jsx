import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminUserView.scss';

import { usersAction } from '../../store/actions/userActions';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';

import moment from 'moment';

const AdminView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersAction());
  }, [dispatch]);

  const usersState = useSelector((state) => state.users);
  const { loading, error, userProfiles } = usersState;

  return (
    <>
      {error ? <Message message={error} /> : null}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div div className="admin-view-wrapper">
            <div className=" admin-view-inner-wrapper">
              <div className="item">NAME</div>
              <div className="item">ADMIN</div>
              <div className="item">CONFIRMED</div>
              <div className="item">CREATED</div>
              <div className="item">UPDATED</div>
            </div>
            {userProfiles.map((userProfile) => (
              <div key={userProfile._id} className="admin-view-inner-wrapper">
                <div className="item">
                  <p>{userProfile.name}</p>
                  <img
                    className="image"
                    src={`../uploads/profiles/${userProfile.profileImage}`}
                    alt={userProfile.name}
                  />
                  <p>{userProfile.email}</p>
                </div>

                <div className="item">
                  {userProfile.isAdmin === true ? (
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
                  {userProfile.isConfirmed === true ? (
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
                  {moment(userProfile.createdAt).fromNow()}
                </div>

                <div className="item">
                  {moment(userProfile.updatedAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AdminView;
