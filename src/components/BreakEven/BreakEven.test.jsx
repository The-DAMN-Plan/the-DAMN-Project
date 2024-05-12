import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import BreakEven from './BreakEven';

// Setup redux-mock-store
const mockStore = configureStore([]);
const store = mockStore({
    sideNav: true,
    expense: [{ type: 'business marketing', expense_name: 'Ad Campaign', expense_amount: 500 }],
    finalBudget: [{ escrow_savings: 10, valuepay: 200, y1_cogs: 50 }],
    income: [{ price: 1000, purchasers: 10, cost_of_delivery: 100 }],
    status: [{ step: 'breakeven', completed: false }] // Assuming 'breakeven' is the relevant step for this test
});

// Setup MemoryRouter with history control
const history = createMemoryHistory();

const Wrapper = ({ children }) => (
    <Provider store={store}>
        <Router history={history}>
            {children}
        </Router>
    </Provider>
);

// Test suite for BreakEven component
describe('BreakEven Component Tests', () => {
    it('renders BreakEven and displays breakeven sales', () => {
        render(<BreakEven />, { wrapper: Wrapper });
        const heading = screen.getByText(/Breakeven Sales/i);
        expect(heading).toBeInTheDocument();
    });

    it('calculates and displays the correct breakeven sales in USD', () => {
        render(<BreakEven />, { wrapper: Wrapper });
        const breakevenSales = screen.getByText(/\/Month/i);
        expect(breakevenSales).toHaveTextContent('$1200/Month'); // Assuming '$1200/Month' is the expected output
    });

});

