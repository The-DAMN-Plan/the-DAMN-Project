import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useHistory } from 'react-router-dom';
import { Container } from '@mui/material';
import './RegisterPage.css';
import video from './video.mp4'


function RegisterPage() {

  return (
    <>
      <div className='video-container'>
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className='login-container'>
      <RegisterForm />
      </div>
    </>
  );
}

export default RegisterPage;
