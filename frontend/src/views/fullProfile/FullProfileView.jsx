import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './FullProfileView.scss';

import { profileByIdAction } from '../../store/actions/profileActions';
import { userReviewIdAction } from '../../store/actions/userReviewActions';

import Message from '../../components/message/Message';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import LinkComp from '../../components/linkComp/LinkComp';
import Rating from '../../components/rating/Rating';

import moment from 'moment';

const FullProfileView = () => {
  const [divHeight, setDivHeight] = useState(0);
  const [nameHeight, setNameHeight] = useState(0);
  const ref = useRef(null);
  const refName = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const profileState = useSelector((state) => state.profileById);
  const { loading, error, profile } = profileState;

  console.log('DDD', profile);

  useEffect(() => {
    dispatch(profileByIdAction(id));
    dispatch(userReviewIdAction(profile?.user));
    setDivHeight(ref.current.offsetHeight);
    setNameHeight(refName.current.offsetHeight);
    return () => {
      console.log('Full Profile cleanup');
    };
  }, [dispatch, id, profile?.user]);

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
                <div
                  ref={ref}
                  className="item bg-image"
                  style={{
                    backgroundImage: `url(../uploads/profiles/${profile?.profileImage})`,
                  }}
                >
                  <div ref={refName}>
                    <div className="full-profile-name">{profile?.name}</div>
                    <Rating
                      value={profile?.rating}
                      text={`  from ${profile?.numReviews} reviews`}
                    />
                  </div>

                  <div
                    className="full-profile-time"
                    style={{ bottom: `-${divHeight - nameHeight * 2}px` }}
                  >
                    <p>
                      Profile last updated:{' '}
                      {moment(profile?.updatedAt).fromNow()}
                    </p>
                    <p>Create: {moment(profile?.createdAt).fromNow()}</p>
                  </div>
                </div>

                <div className="item">
                  <div className="specialisation-wrapper">
                    <div className="specialisation">
                      {profile?.specialisationOne}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationTwo}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationThree}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationFour}
                    </div>
                  </div>
                  <h1>My BIO</h1>
                  <p>{profile?.description}</p>
                  <h1>Specialisation</h1>
                  <p>{profile?.specialisation}</p>
                  <div>
                    {profile?.reviews.length > 0 ? (
                      <div className="review-wrapper">
                        <h1>Here's what people are saying</h1>
                        {profile.reviews.map((review) => (
                          <div key={review._id}>
                            <p>By:{review.name}</p>
                            <p>Review:{review.comment}</p>
                            <p>
                              Reviewed: {moment(review.createdAt).fromNow()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="item">
                  <h1>Contact Details</h1>
                  <p>{profile?.location}</p>
                  <p>Mobile number: {profile?.telephoneNumber}</p>
                  <p>
                    email:{' '}
                    <a
                      href={`mailto: ${profile?.email}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile?.email}
                    </a>
                  </p>
                </div>
              </div>
              <LinkComp
                route="reviewer-login"
                routeName="Want to review this person"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FullProfileView;
