import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addPersonalExpense(action) {
    try {
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

function* deleteExpense(action) {
    try{
        const { expenseId, budgetObjId } = action.payload; // Destructure futurePlanId and budgetId from payload
        yield axios.delete(`/api/budget/expense/${expenseId}`);
        yield put({ type: 'BUDGET_PLAN', payload: budgetObjId }); // Pass budgetId as payload
    } catch (error) {
        console.log('Error deleting expense', error);
    }
}

function* updateExpense(action) {
    try {
        const { budgetObjId } = action.payload; // Destructure futurePlanId and budgetId from payload
        console.log('action payload',action.payload[0].budget_id);

        const response = yield axios.put(`/api/budget/expense`, action.payload);
        
        yield put({ type: 'BUDGET_PLAN', payload: action.payload[0].budget_id }); // Pass budgetId as payload

    } catch(error) {
        console.log('Error updating expense', error);
    }
}

function* expenseSaga() {
    yield takeLatest('FETCH_EXPENSES', fetchExpenses);
    yield takeLatest('ADD_PERSONAL_EXPENSE', addPersonalExpense);
    yield takeLatest('DELETE_EXPENSE', deleteExpense);
    yield takeLatest('UPDATE_EXPENSE', updateExpense);
}

export default expenseSaga;