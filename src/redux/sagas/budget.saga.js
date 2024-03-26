import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* startPlan(action) {
    try {
        const response = yield axios.post(`/api/budget`, action.payload);
        console.log('Start plan');
        console.log(response.data);
        yield put({
            type: 'SET_BUDGET',
            payload: response.data
        });

        yield put ({
            type: 'SET_STATUS',
            payload: response.data[0].status
        })
    } catch(error) {
        console.log('Error adding personal expense', error);
    }
}

function* fetchBudget(action) {
    try {
        const response = yield axios.get(`/api/budget/${action.payload}`)
        console.log(response.data);
        yield put({
            type: 'SET_FINAL_BUDGET',
            payload: response.data
        })
        yield put({
            type: 'SET_EXPENSE',
            payload: response.data[0].expenses
        })
        yield put({
            type: 'SET_FUTURE_PLAN',
            payload: response.data[0].future_plans
        })
        yield put({
            type: 'SET_INCOME',
            payload: response.data[0].revenue_streams
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