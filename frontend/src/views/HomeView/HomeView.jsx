import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listServicesAction } from '../../store/actions/servicesActions';
import './HomeView.scss';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Card from '../../components/card/Card';

const HomeView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listServicesAction());
  }, [dispatch]);

  const servicesList = useSelector((state) => state.servicesList);
  const { loading, error, services } = servicesList;

  const closeMessageHandler = () => {
    dispatch(listServicesAction());
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
            {services?.map((service) => (
              <div key={service._id}>
                <Card
                  className="card"
                  name={service.name + service.id}
                  src={service.image}
                  alt={service.name}
                  description={service.description}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeView;
