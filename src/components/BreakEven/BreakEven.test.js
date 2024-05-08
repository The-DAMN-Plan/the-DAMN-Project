import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import BreakEven from './BreakEven';

const mockStore = configureStore([]);
const store = mockStore({
    sideNav: true,
    expense: [{ type: 'business marketing', expense_name: 'Ad Campaign', expense_amount: 500 }],
    finalBudget: [{ escrow_savings: 10, valuepay: 200, y1_cogs: 50 }],
    income: [{ price: 1000, purchasers: 10, cost_of_delivery: 100 }]
});

const routerParams = {
    params: {
        budgetId: '1'
    }
};

const wrapper = ({ children }) => (
    <Provider store={store}>
        <MemoryRouter initialEntries={[`/path/${routerParams.params.budgetId}`]}>
            {children}
        </MemoryRouter>
    </Provider>
);

it('renders BreakEven and displays breakeven sales', () => {
    render(<BreakEven />, { wrapper });
    const heading = screen.getByText(/Breakeven Sales/i);
    expect(heading).toBeInTheDocument();
});

it('calculates and displays the correct breakeven sales', () => {
    render(<BreakEven />, { wrapper });
    const breakevenSales = screen.getByText(/\/Month/i);
    expect(breakevenSales).toHaveTextContent('£1200/Month'); // Adjust based on expected calculation
});
