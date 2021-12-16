import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listServicesAction } from '../../store/actions/servicesActions';
import './HomeView.scss';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';

const HomeView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listServicesAction());
  }, [dispatch]);

  const servicesList = useSelector((state) => state.servicesList);
  const { loading, success, error, services } = servicesList;

  const closeMessageHandler = () => {
    dispatch(listServicesAction());
  };

  return (
    <>
      {error ? <Message message={error} onClick={closeMessageHandler} /> : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="home-view">
          <h1>Services</h1>
          {services?.map((service) => (
            <>
              <div>{service.name}</div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeView;
