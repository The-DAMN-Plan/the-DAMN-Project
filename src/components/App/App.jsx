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
import OtherBusinessExp from '../BusinessExpense/OtherBusinessExp';
import CashFlow from '../CashFlow/CashFlow';
import Background from '../Background/Background';

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

  const toggleDrawer = () => {
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

        {user.id ? <Background /> : ''}
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

              <ProtectedRoute exact path="/plans">
                <ActivePlans />
              </ProtectedRoute>

              <ProtectedRoute exact path="/test/:budgetId">
                <HumanResourcesPage1 />
              </ProtectedRoute>

              <ProtectedRoute exact path="/startplan/:budgetId">
                <StartPlan />
              </ProtectedRoute>

              <ProtectedRoute exact path="/fundamentalexpenses/:budgetId">
                <PBPage2 />
              </ProtectedRoute>

              <ProtectedRoute exact path="/personalsavings/:budgetId">
                <PersonalSavings />
              </ProtectedRoute>

              <ProtectedRoute exact path="/variableexpenses/:budgetId">
                <VariableExpenses />
              </ProtectedRoute>

              <ProtectedRoute exact path="/futureplans/:budgetId">
                <FuturePlans />
              </ProtectedRoute>

              <ProtectedRoute exact path="/otherexpenses/:budgetId">
                <OtherExpenses />
              </ProtectedRoute>

              <ProtectedRoute exact path="/incomeyear1/:budgetId">
                <Year1Income />
              </ProtectedRoute>

              <ProtectedRoute exact path="/overview/:budgetId">
                <BEOverview />
              </ProtectedRoute>

              <ProtectedRoute exact path="/businessexpensepage1/:budgetId">
                <BusinessExpensePage1 />
              </ProtectedRoute>

              <ProtectedRoute exact path="/businessexpensepage2/:budgetId">
                <BusinessExpensePage2 />
              </ProtectedRoute>

              <ProtectedRoute exact path="/marketingy1/:budgetId">
                <MarketingPageYear1 />
              </ProtectedRoute>

              {/* Took out page 2 so no more year 2 Marketing expenses should come through */}
              {/* <ProtectedRoute exact path="/marketingy2/:budgetId">
                <MarketingPageYear2 />
              </ProtectedRoute> */}

              <ProtectedRoute exact path="/hrpagey1/:budgetId">
                <HumanResourcesPage1 />
              </ProtectedRoute>

              {/* Took out page 2 so no more year 2 HR expenses should come through */}
              {/* <ProtectedRoute exact path="/hrpagey2/:budgetId">
                <HumanResourcesPage2 />
              </ProtectedRoute> */}

              <ProtectedRoute exact path="/otherbusiness/:budgetId">
                <OtherBusinessExp />
              </ProtectedRoute>

              <ProtectedRoute exact path="/breakeven/:budgetId">
                <BreakEven />
              </ProtectedRoute>

              <ProtectedRoute exact path="/cashflow/:budgetId">
                <CashFlow />
              </ProtectedRoute>

              <ProtectedRoute exact path="/valuepay/:budgetId">
                <ValuePay />
              </ProtectedRoute>

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
              <ProtectedRoute exact path="/breakeven/:budgetId">
                <BreakEven />
              </ProtectedRoute>

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
