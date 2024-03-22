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
import VariableExpenses from '../PersonalExpenses/VariableExpenses';
import BEOverview from '../BEOverview/BEOverview';
import MarketingPage from '../BusinessExpenses/MarketingPage';

import './App.css';
import theme from '../../../src/muiTheme';  // Import the custom theme
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'; // Import the ThemeProvider component from Material-UI  
import BreakEven from '../BreakEven/BreakEven';
import OtherExpenses from '../PersonalExpenses/OtherExpenses';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import FuturePlans from '../PersonalExpenses/FuturePlans';
import CreateBusiness from '../CreateBusiness/CreateBusiness';
import BusinessExpensePage1 from '../BusinessExpense/BusinessExpensePage1';
import BusinessExpensePage2 from '../BusinessExpense/BusinessExpensePage2';


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

    <LocalizationProvider dateAdapter={AdapterMoment} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
              <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:5173/about will show the about page. */}
              <Route exact path="/about">
                <AboutPage />
              </Route>

              <Route exact path="/test">
                <BEOverview />
              </Route>

              <Route exact path="/startplan">
                <StartPlan />
              </Route>

              <Route exact path="/fundamentalexpenses">
                <PBPage2 />
              </Route>

              <Route exact path="/personalsavings">
                <PersonalSavings />
              </Route>

              <Route exact path="/variableexpenses">
                <VariableExpenses />
              </Route>

              <Route exact path="/futureplans">
                <FuturePlans />
              </Route>

              <Route exact path="/otherexpenses">
                <OtherExpenses />
              </Route>

              <Route exact path="/marketing">
                <MarketingPage />
              </Route>
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
              <ProtectedRoute exact path="/user">
                <UserPage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/info">
                <InfoPage />
              </ProtectedRoute>
              <ProtectedRoute
                // logged in shows business expense page 1 else shows LoginPage
                exact
                path="/businessexpensepage1"
              >
                <BusinessExpensePage1 />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in shows business expense page 2 else shows LoginPage
                exact
                path="/businessexpensepage2"
              >
                <BusinessExpensePage2/>
              </ProtectedRoute>

              <Route exact path="/login">
                {user.id ?
                  // If the user is already logged in, 
                  // redirect to the /user page
                  <Redirect to="/user" />
                  :
                  // Otherwise, show the login page
                  <LoginPage />
                }
              </Route>
              <Route exact path="/budget/breakeven">
                <BreakEven />
              </Route>

              <Route exact path="/registration">
                {user.id ? <Redirect to="/user" /> : <RegisterPage />}
              </Route>

              <Route exact path="/home">
                {user.id ? <Redirect to="/user" /> : <LandingPage />}
              </Route>

              <Route>
                <h1>404</h1>
              </Route>

            </Switch>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
