import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfilesAction } from '../../store/actions/userActions';
import './HomeView.scss';

import SearchInput from '../../components/searchInput/SearchInput';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Card from '../../components/card/Card';

const HomeView = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfilesAction());
  }, [dispatch]);

  const userProfiles = useSelector((state) => state.userProfiles);
  const { loading, error, profiles } = userProfiles;

  const searchedProfiles = profiles.filter((profile) => {
    if (profile.name || profile.description || profile.location) {
      const name = profile.name;
      const description = profile.description;
      const location = profile.location;
      const search = description.concat(...location, ...name);
      return search.toLowerCase().includes(keyword.toLowerCase());
    }
    return false;
  });

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const highlightKeywordMatch = (current) => {
    let reggie = new RegExp(keyword, 'ig');
    let found = current.search(reggie) !== -1;
    return !found
      ? current
      : current.replace(
          reggie,
          '<span style="color:rgba(92, 184, 92, 1); text-decoration:underline" >' +
            keyword +
            '</span>',
        );
  };

  return (
    <>
      {error ? <Message message={error} /> : null}

      <div className="home-view ">
        <SearchInput
          label="Check-a-Sport"
          type="search"
          placeholder="Search for a Profile"
          value={keyword}
          handleSearch={handleSearch}
        />
        {loading ? <LoadingSpinner /> : null}
        {keyword.length > 0 ? (
          <div className="card-wrapper">
            {searchedProfiles?.map((profile) => {
              return !profile.isAdmin ? (
                <div key={profile._id}>
                  <Card
                    className="card"
                    id={profile._id}
                    name={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightKeywordMatch(profile.name),
                        }}
                      ></span>
                    }
                    src={`uploads/profiles/${profile.profileImage}`}
                    alt={profile.name}
                    description={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightKeywordMatch(profile.description),
                        }}
                      ></span>
                    }
                    location={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightKeywordMatch(profile.location),
                        }}
                      ></span>
                    }
                    email={profile.email}
                    telephoneNumber={profile.telephoneNumber}
                  />
                </div>
              ) : null;
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HomeView;
