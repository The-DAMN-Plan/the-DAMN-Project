import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import business from './business.reducer';
import budget from './budget.reducer';
import sideNav from './sideNav.reducer';
import status from './status.reducer';
import expense from './expense.ruducer';
import income from './income.reducer';
import futurePlans from './futurePlan.reducer';
import finalBudget from './finalBudget.reducer';
import cashflow from './cashflow.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  business, // Gets the businesses for the logged in user
  budget,
  sideNav,
  status,
  expense,
  income,
  cashflow,
  futurePlans,
  finalBudget
});

export default rootReducer;
