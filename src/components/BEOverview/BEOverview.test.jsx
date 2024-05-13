import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import BEOverview from './BEOverview';

const mockStore = configureStore([]);

describe('BEOverview', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            finalBudget: [{ escrow_savings: 100, cash_balance: 5000, vp_percent: 10, vp_income: 10000 }],
            income: [
                { price: 100, purchasers: 3, cost_of_delivery: 20 },
                { price: 150, purchasers: 2, cost_of_delivery: 30 }
            ]
        });

        render(
            <Provider store={store}>
                <BEOverview />
            </Provider>
        );
    });

    it('calculates total income correctly', () => {
        const totalIncome = screen.getByText(/Projected Revenue:/).nextSibling.textContent;
        expect(totalIncome).toBe('$450'); // 100*3 + 150*2
    });

    it('calculates expenses to deliver correctly', () => {
        const totalExpenseToDeliver = screen.getByText(/Total Variable Expense:/).nextSibling.textContent;
        expect(totalExpenseToDeliver).toBe('$150'); // (20*3 + 30*2)
    });

    it('calculates initial VE correctly', () => {
        const initialVE = parseFloat(screen.getByRole('textbox', { name: 've' }).value);
        expect(initialVE).toBeCloseTo(33.33, 1); // ((60/450)*100)
    });
});
