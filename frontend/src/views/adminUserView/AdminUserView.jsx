import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AdminUserView.scss';

import { usersAction, deleteUserAction } from '../../store/actions/userActions';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Button from '../../components/button/Button';

import moment from 'moment';

const AdminView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged in user Details saved in local storage
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
    dispatch(usersAction());
  }, [dispatch, navigate, userInfo]);

  const usersState = useSelector((state) => state.users);
  const { loading, error, userProfiles } = usersState;

  const handleDeleteUser = (id) => {
    // Dispatch user delete action
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      dispatch(deleteUserAction(id));
      dispatch(usersAction());
    }
  };

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
                  <Button
                    colour="transparent"
                    text="Delete User"
                    className="btn"
                    title="Delete Profile"
                    onClick={() => handleDeleteUser(userProfile._id)}
                    disabled={!userProfile.isConfirmed}
                  ></Button>
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
