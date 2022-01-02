import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './DateTime.scss';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const DateTime = () => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    setInterval(() => {
      setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
  }, [dateTime]);

  return <>{dateTime ? <div>{dateTime}</div> : <LoadingSpinner />}</>;
};

export default DateTime;
