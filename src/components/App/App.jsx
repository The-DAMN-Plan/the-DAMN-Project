import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import StartPlan from '../PersonalExpenses/StartPlan';
import PBPage2 from '../PersonalExpenses/PBpage2';
import PersonalSavings from '../PersonalExpenses/PersonalSavings';

import './App.css';
import theme from '../../../src/muiTheme';  // Import the custom theme
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'; // Import the ThemeProvider component from Material-UI  
import BreakEven from '../BreakEven/BreakEven';
import OtherExpenses from '../PersonalExpenses/OtherExpenses';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });

    if (user.id) {
      dispatch({ type: 'FETCH_USER_BUDGETS', payload: user.id });
    }

  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />

    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>
          <Route
            // shows Start Plan page, the first page of the form users will fill out. Currently not protectedv at all
            // will refactor to protected route once form is complete - LJ
            exact
            path="/startplan"
          >
            <StartPlan />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
          <Route
          // Shows the secons page of personal budget. This page user will input their fixed bills like insurance payments.
          // Still need to set up the server side posting and edit functionality.
            exact
            path="/plan2"
          >
            <PBPage2 />
          </Route>
          <Route
            // shows 3rd page plan sequence, the third page of the form users will fill out. Currently not protected at all
            // will refactor to protected route once form is complete - LJ
            exact
            path="/plan3"
          >
            <PersonalSavings />
          </Route>
          
          <Route
            // shows 4rd page plan sequence, the fourth page of the form users will fill out. Currently not protected at all
            // will refactor to protected route once form is complete - LJ
            exact
            path="/otherexpenses"
          >
            <OtherExpenses />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/budget/breakeven"
          >
            <BreakEven />
          </Route>
          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>  
  );
}

export default App;
