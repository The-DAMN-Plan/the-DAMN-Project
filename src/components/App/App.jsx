import React, { useEffect, useState } from 'react';
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
import Year1Income from '../BusinessIncome/Year1Income';
import Year2Income from '../BusinessIncome/Year2Income';
import BEOverview from '../BEOverview/BEOverview';
import MarketingPageYear1 from '../BusinessExpense/MarketingPageYear1';

import './App.css';
import theme from '../../../src/muiTheme';  // Import the custom theme
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'; // Import the ThemeProvider component from Material-UI  
import BreakEven from '../BreakEven/BreakEven';
import OtherExpenses from '../PersonalExpenses/OtherExpenses';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import FuturePlans from '../PersonalExpenses/FuturePlans';
import BusinessExpensePage1 from '../BusinessExpense/BusinessExpensePage1';
import BusinessExpensePage2 from '../BusinessExpense/BusinessExpensePage2';
import ValuePay from '../ValuePay/ValuePay';
import SideNav from '../Nav/SideNav';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import ActivePlans from '../ActivePlans/ActivePlans';
import HumanResourcesPage1 from '../BusinessExpense/HumanResourcesPage1';
import HumanResourcesPage2 from '../BusinessExpense/HumanResourcesPage2';
import OtherBusinessExp from '../BusinessExpense/OtherBusinessExp';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  // const open = useSelector(store => store.sideNav);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });

    if (user.id) {
      dispatch({ type: 'FETCH_USER_BUDGETS', payload: user.id });
    }

  }, [dispatch]);
  

  // const [open, setOpen] = useState(false);
  const drawerWidth = 350;

  const toggleDrawer = ()=>{
    setOpen(!open);
  }
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (

    <LocalizationProvider dateAdapter={AdapterMoment} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DrawerHeader />
        <Router>
          <div>
            <Nav drawerWidth={drawerWidth} />
            <Switch>
              {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
              <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:5173/about will show the about page. */}
              <Route exact path="/about">
                <AboutPage />
              </Route>

              <Route exact path="/plans">
                <ActivePlans />
              </Route>

              <Route exact path="/test/:budgetId">
                <HumanResourcesPage1 />
              </Route>

              <Route exact path="/startplan">
                <StartPlan />
              </Route>

              <Route exact path="/fundamentalexpenses/:budgetId">
                <PBPage2 />
              </Route>

              <Route exact path="/personalsavings/:budgetId">
                <PersonalSavings />
              </Route>

              <Route exact path="/variableexpenses/:budgetId">
                <VariableExpenses />
              </Route>

              <Route exact path="/futureplans/:budgetId">
                <FuturePlans />
              </Route>

              <Route exact path="/otherexpenses/:budgetId">
                <OtherExpenses />
              </Route>

              <Route exact path="/incomeyear1/:budgetId">
                <Year1Income />
              </Route>

              <Route exact path="/incomeyear2/:budgetId">
                <Year2Income />
              </Route>

              <Route exact path="/overview/:budgetId">
                <BEOverview />
              </Route>

              <Route exact path="/businessexpensepage1/:budgetId">
                <BusinessExpensePage1/>
              </Route>

              <Route exact path="/businessexpensepage2/:budgetId">
                <BusinessExpensePage2/>
              </Route>

              <Route exact path="/marketingy1/:budgetId">
                <MarketingPageYear1 />
              </Route>
              {/* this one below needs to have a progbar value of 78 */}
              <Route exact path="/marketingy2/:budgetId">
                <MarketingPageYear1 />
              </Route>

              <Route exact path="/hrpagey1/:budgetId">
                <HumanResourcesPage1 />
              </Route>

              <Route exact path="/hrpagey2/:budgetId">
                <HumanResourcesPage2 />
              </Route>

              <Route exact path="/otherbusiness/:budgetId">
                <OtherBusinessExp />
              </Route>

              <Route exact path="/breakeven/:budgetId">
                <BreakEven />
              </Route>

              <Route exact path="/cashflow/:budgetId">
                <AboutPage />
              </Route>

              <Route exact path="/valuepay/:budgetId">
                <ValuePay />
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
              <Route exact path="/breakeven/:budgetId">
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
            
          </div>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
