import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './AdminReviewersView.scss';

import { userAdminReviewersDetailsAction } from '../../store/actions/userReviewActions';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Button from '../../components/button/Button';

import moment from 'moment';

const AdminReviewersView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged in user Details saved in local storage
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
    dispatch(userAdminReviewersDetailsAction());
  }, [dispatch, navigate, userInfo]);

  const userAdminReviewersDetails = useSelector(
    (state) => state.userAdminReviewersDetails,
  );
  const { loading, error, reviewers } = userAdminReviewersDetails;

  console.log('DDDD', reviewers);

  return (
    <>
      {error ? <Message message={error} /> : null}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="admin-reviewer-wrapper">
            <div className=" heading admin-reviewer-inner-wrapper">
              <div className="item">NAME</div>
              <div className="item">EMAIL</div>
              <div className="item">CREATED</div>
            </div>

            {reviewers.map((reviewer) => (
              <div key={reviewer._id} className="admin-reviewer-inner-wrapper">
                <div className="item">
                  <p>{reviewer.name}</p>
                </div>
                <div className="item">
                  <p>{reviewer.email}</p>
                </div>
                <div className="item">
                  {moment(reviewer.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AdminReviewersView;
