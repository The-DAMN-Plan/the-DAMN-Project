import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addFuturePlan(action) {
    try {
        console.log('Adding Future Plan', action.payload);
        yield axios.post(`/api/budget/expense`, action.payload);
    } catch(error) {
        console.log('Error adding future plan', error);
    }
}

function* futurePlanSaga() {
    yield takeLatest('ADD_FUTURE_PLAN', addFuturePlan);
}

export default futurePlanSaga;