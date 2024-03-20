import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addPersonalExpense(action) {
    try {
        yield axios.post(`/api/budget/expense`, action.payload);
    } catch(error) {
        console.log('Error adding personal expense', error);
    }
}

function* expenseSaga() {
    yield takeLatest('ADD_PERSONAL_EXPENSE', addPersonalExpense);
}

export default expenseSaga;