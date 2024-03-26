import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addPersonalExpense(action) {
    try {
        console.log('Expense post', action.payload);
        yield axios.post(`/api/budget/expense`, action.payload);
        put({ type: 'FETCH_BUSINESS' })
    } catch (error) {
        console.log('Error adding personal expense', error);
    }
}

function* fetchExpenses(action) {
    try {
        const response = yield axios.get(`/api/budget/expense/${action.payload}`);
        yield put({ type: 'EXPENSES_FETCH_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Fetch Expenses Error', error);
    }
}

function* expenseSaga() {
    yield takeLatest('FETCH_EXPENSES', fetchExpenses);
    yield takeLatest('ADD_PERSONAL_EXPENSE', addPersonalExpense);
}

export default expenseSaga;