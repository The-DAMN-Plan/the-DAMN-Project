import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Container } from '@mui/material';
import './LoginPage.css';
import video from './video.mp4'

function LoginPage() {
  const history = useHistory();

  return (
    <>
      <div className='video-container'>
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className='login-container'>
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
