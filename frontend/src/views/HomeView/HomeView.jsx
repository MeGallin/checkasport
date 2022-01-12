import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profilesAction } from '../../store/actions/profileActions';
import './HomeView.scss';

import SearchInput from '../../components/searchInput/SearchInput';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Card from '../../components/card/Card';

const HomeView = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profilesAction());
  }, [dispatch]);

  const profilesState = useSelector((state) => state.profiles);
  const { loading, error, profiles } = profilesState;

  const searchedProfiles = profiles.filter((profile) => {
    if (
      profile.name ||
      profile.description ||
      profile.location ||
      profile.specialisation ||
      profile.keyWordSearch
    ) {
      const description = profile.description;
      const name = profile.name;
      const location = profile.location;
      const specialisation = profile?.specialisation;
      const keyWordSearch = profile?.keyWordSearch;

      const search = description.concat(
        ...location,
        ...name,
        ...specialisation,
      );

      const found =
        search.toLowerCase().includes(keyword.toLowerCase()) ||
        keyWordSearch.toLowerCase().includes(keyword.toLowerCase());

      if (found) {
        return found;
      }
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
          '<span style="color:rgba(255, 255, 255, .6); text-decoration:underline;" >' +
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
          placeholder="sports massage post-code"
          value={keyword}
          handleSearch={handleSearch}
        />
        {keyword.length > 0 ? (
          <div className="keyword-length">
            We found {searchedProfiles.length} profiles that match your search
            criteria.
          </div>
        ) : null}

        {loading ? <LoadingSpinner /> : null}
        {keyword.length > 0 ? (
          <div className="card-wrapper">
            {searchedProfiles.map((profile) => (
              <Card
                specialisationOne={profile.specialisationOne}
                specialisationTwo={profile.specialisationTwo}
                specialisationThree={profile.specialisationThree}
                specialisationFour={profile.specialisationFour}
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
                      __html: highlightKeywordMatch(
                        profile.description.slice(0, 120) + '...',
                      ),
                    }}
                  ></span>
                }
                rating={profile.rating}
                number
                of
                reviews={profile.numReviews}
              />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HomeView;
