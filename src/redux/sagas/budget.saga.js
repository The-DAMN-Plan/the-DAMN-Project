import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* startPlan(action) {
    try {
        const response = yield axios.post(`/api/budget`, action.payload);
        console.log('Start plan');
        yield put({
            type: 'SET_BUDGET',
            payload: response.data
        })
    } catch(error) {
        console.log('Error adding personal expense', error);
    }
}

function* fetchBudget(action) {
    try {
        const response = yield axios.get(`/api/budget/${action.payload}`)
        yield put({
            type: 'SET_FINAL_BUDGET',
            payload: response.data
        })
        yield put({
            type: 'SET_EXPENSE',
            payload: response.data[0].expenses
        })
    } catch(err) {
        console.log('Error getting working budget', err);
    }
}



function* budgetSaga() {
    yield takeLatest('START_PLAN', startPlan);
    yield takeLatest('BUDGET_PLAN', fetchBudget);
}

export default budgetSaga;