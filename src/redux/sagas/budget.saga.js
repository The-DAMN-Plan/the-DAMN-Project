import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* startPlan(action) {
    try {
        yield axios.post(`/api/budget`, action.payload);
    } catch(error) {
        console.log('Error adding personal expense', error);
    }
}

function* fetchBudget(action) {
    try{
        const response = yield axios.get(`/api/budget/${action.payload}`)

        yield put({
            type: 'SET_BUDGET',
            payload: response.data
        });
    } catch (error) {
        console.log("Fetch budget error:", error);
    }
}


function* budgetSaga() {
    yield takeLatest('START_PLAN', startPlan);
    yield takeLatest('FETCH_BUDGET', fetchBudget);
}

export default budgetSaga;