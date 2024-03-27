import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('');
  const [agreeToEmails, setAgreeToEmails] = useState(false);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        email: email,
        agreeToEmails: agreeToEmails
      },
    });
  }; // end registerUser

  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid xs={2} >

      </Grid>
      <Grid component='form' direction='column' autoComplete="off" alignItems="center" justifyContent="center" container spacing={2} xs={8} onSubmit={registerUser} >
        <Grid textAlign='center'>
          <Typography variant='h2' color={'primary'} sx={{ mb: 1 }}>Register User</Typography>
          {errors.loginMessage && (
            <Typography variant='h6' className="alert" role="alert">
              {errors.loginMessage}
            </Typography>
          )}
        </Grid>

        <Grid>
          <TextField
            fullWidth label='Username' variant="filled"
            type="text"
            name="username"
            sx={{ my: 0.5, width: '50vh',backgroundColor:'rgb(255,255,255)'  }}
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth label='Password'
            variant="filled"
            type="password"
            name="password"
            sx={{ my: 0.5, width: '50vh',backgroundColor:'rgb(255,255,255)' }}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth label='Phone'
            variant="filled"
            type="text"
            name="phone"
            sx={{ my: 0.5, width: '50vh',backgroundColor:'rgb(255,255,255)' }}
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth label='First Name'
            variant="filled"
            type="text"
            name="firstName"
            sx={{ my: 0.5, width: '50vh', backgroundColor:'rgb(255,255,255)' }}
            required
            value={firstName}
            onChange={(event) => setfirstName(event.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth label='Last Name'
            variant="filled"
            type="text"
            name="lastName"
            sx={{ my: 0.5, width: '50vh', backgroundColor:'rgb(255,255,255)' }}
            required
            value={lastName}
            onChange={(event) => setlastName(event.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth label='Email'
            variant="filled"
            type="text"
            name="email"
            sx={{ my: 0.5, width: '50vh', backgroundColor:'rgb(255,255,255)' }}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Grid>
        <Grid>
          <FormControlLabel
            sx={{ my: 0.5 }}
            control={
              <Checkbox
                checked={agreeToEmails}
                onChange={(event) => setAgreeToEmails(event.target.checked)}
              />}
            label="Agree to Emails?" />
        </Grid>
        <Grid width={'40vh'}>
          <Button fullWidth variant='contained'
            className="btn"
            type="submit"
            name="submit"
            value="Register"
            sx={{ my: 0.5 }}
          >
            Register
          </Button>

          <Button fullWidth
            variant='outlined'
            color='secondary'
            type="button"
            className="btn btn_asLink"
            sx={{ my: 0.5 }}
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
      <Grid xs={2} >

      </Grid>
    </Grid>
  );
}



{/* <form className="formPanel" onSubmit={registerUser}>
<h2>Register User</h2>
{errors.registrationMessage && (
  <h3 className="alert" role="alert">
    {errors.registrationMessage}
  </h3>
)}
<div>
  <label htmlFor="username">
    Username:
    <input
      type="text"
      name="username"
      value={username}
      required
      onChange={(event) => setUsername(event.target.value)}
    />
  </label>
</div>
<div>
  <label htmlFor="password">
    Password:
    <input
      type="password"
      name="password"
      value={password}
      required
      onChange={(event) => setPassword(event.target.value)}
    />
  </label>
</div>
<div>
  <label htmlFor="phone">
    Phone:
    <input
      type="text"
      name="phone"
      value={phone}
      onChange={(event) => setPhone(event.target.value)}
    />
  </label>
</div>
<div>
  <label htmlFor="firstName">
    First Name:
    <input
      type="text"
      name="firstName"
      value={firstName}
      onChange={(event) => setfirstName(event.target.value)}
    />
  </label>
</div>
<div>
  <label htmlFor="lastName">
    Last Name:
    <input
      type="text"
      name="lastName"
      value={lastName}
      onChange={(event) => setlastName(event.target.value)}
    />
  </label>
</div>
<div>
  <label htmlFor="email">
    Email:
    <input
      type="email"
      name="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
  </label>
</div>
<div>
  <label htmlFor="agreeToEmails">
    Agree to receive emails:
    <input
      type="checkbox"
      name="agreeToEmails"
      checked={agreeToEmails}
      onChange={(event) => setAgreeToEmails(event.target.checked)}
    />
  </label>
</div>
<div>
  <input className="btn" type="submit" name="submit" value="Register" />
</div>
</form> */}