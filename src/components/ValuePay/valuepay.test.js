// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import configureMockStore from 'redux-mock-store';
// import { BrowserRouter as Router } from 'react-router-dom';
// import ValuePay from './ValuePay';

// const mockStore = configureMockStore([]);

// describe('ValuePay Component', () => {
//   let store;
//   beforeEach(() => {
//     store = mockStore({
//       finalBudget: [],
//       status: [],
//       expense: [],
//       futurePlans: [],
//       sideNav: false
//     });
//   });

//   it('renders correctly', () => {
//     const { getByText } = render(
//       <Provider store={store}>
//         <Router>
//           <ValuePay />
//         </Router>
//       </Provider>
//     );
//     expect(getByText('Your Value Pay to Pay Yourself')).toBeInTheDocument();
//     expect(getByText('Enter a Percentage')).toBeInTheDocument();
//     expect(getByText('Owner Pay')).toBeInTheDocument();
//   });

//   it('updates state on percentage input change', () => {
//     const { getByLabelText } = render(
//       <Provider store={store}>
//         <Router>
//           <ValuePay />
//         </Router>
//       </Provider>
//     );

//     const percentageInput = getByLabelText('percent');
//     fireEvent.change(percentageInput, { target: { value: '50' } });

//     expect(percentageInput.value).toBe('50');
//   });

//   it('updates state on owner pay input change', () => {
//     const { getByLabelText } = render(
//       <Provider store={store}>
//         <Router>
//           <ValuePay />
//         </Router>
//       </Provider>
//     );

//     const ownerPayInput = getByLabelText('dollaramount');
//     fireEvent.change(ownerPayInput, { target: { value: '1000' } });

//     expect(ownerPayInput.value).toBe('1000');
//   });

//   it('triggers handleSubmit function on button click', () => {
//     const handleSubmit = jest.fn();

//     const { getByText } = render(
//       <Provider store={store}>
//         <Router>
//           <ValuePay />
//         </Router>
//       </Provider>
//     );

//     const button = getByText('Save');
//     fireEvent.click(button);

//     expect(handleSubmit).toHaveBeenCalled();
//   });
// });