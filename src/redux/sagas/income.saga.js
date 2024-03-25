import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addRevenueStream(action) {
    try {
        console.log('Revenue post', action.payload);
        yield axios.post(`/api/budget/revenuestream`, action.payload);
    } catch(error) {
        console.log('Error adding income', error);
    }
}

function* incomeSaga() {
    yield takeLatest('ADD_BUSINESS_INCOME', addRevenueStream);
}

export default incomeSaga;