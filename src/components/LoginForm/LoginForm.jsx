import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Grid container>
      <Grid xs={2} >

      </Grid>
      <Grid component='form' direction='column' autoComplete="off" alignItems="center" justifyContent="center" container spacing={2} xs={8} onSubmit={login} >
        <Paper sx={{p: 3, m:3}}>
          <Grid textAlign='center'>
            <Typography variant='h5' sx={{mb:1}}>Login</Typography>
            {errors.loginMessage && (
              <Typography variant='h6' className="alert" role="alert">
                {errors.loginMessage}
              </Typography>
            )}
          </Grid>

          <Grid>
            <TextField
              fullWidth label='Username' variant="outlined"
              type="text"
              name="username"
              sx={{ my: 0.5 }}
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth label='Password'
              variant="outlined"
              type="password"
              name="password"
              sx={{ my: 0.5 }}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid>
            <Button fullWidth variant='contained'
              className="btn"
              type="submit"
              name="submit"
              value="Log In"
              sx={{ my: 0.5 }}
            >
              Log In
            </Button>

            <Button fullWidth
              variant='outlined'
              color='secondary'
              type="button"
              className="btn btn_asLink"
              sx={{ my: 0.5 }}
              onClick={() => {
                history.push('/registration');
              }}
            >
              Register
            </Button>
          </Grid>

        </Paper>
      </Grid>
      <Grid xs={2} >

      </Grid>
    </Grid>
  );
}

export default LoginForm;
