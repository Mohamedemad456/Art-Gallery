import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link, useRouteError } from 'react-router-dom';
import './ErrorComponent.css';

function ErrorComponent() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="error-container">
      <Alert variant="danger" className="error-alert" dismissible>
        <Alert.Heading className="error-heading">Oops! Something went wrong.</Alert.Heading>
        <p className="error-message">
          {error?.message || 'An unexpected error occurred. Please try again later.'}
        </p>
        {error?.status && (
          <p className="error-status">
            Status Code: {error.status}
          </p>
        )}
        <Link to="/" className="back-link">
          <Button variant="primary">Back to Homepage</Button>
        </Link>
      </Alert>
    </div>
  );
}

export default ErrorComponent;
