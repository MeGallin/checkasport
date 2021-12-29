import React from 'react';
import './FullProfileView.scss';

const FullProfileView = ({ history, match }) => {
  console.log(match);
  console.log(history);
  return (
    <div className="full-profile">Show full profile of each member per id:</div>
  );
};

export default FullProfileView;
