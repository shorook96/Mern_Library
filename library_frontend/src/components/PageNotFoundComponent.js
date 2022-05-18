import React, { useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PageNotFoundComponent = () => {
  const getBackHome = useNavigate();

  const handleAlertClosing = () => {
    getBackHome('/', { replace: true });
  };
  return (
    <Alert
      variant="danger w-50 m-auto mt-5"
      dismissible
      onClose={handleAlertClosing}
    >
      <Alert.Heading>Error 404</Alert.Heading>
      <p>There is no such page.</p>
    </Alert>
  );
};

export default PageNotFoundComponent;
