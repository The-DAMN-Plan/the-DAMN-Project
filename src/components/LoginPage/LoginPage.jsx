import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Container } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
